package com.emicalculator.emi.controllerimpl;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.web.bind.annotation.RestController;

import com.emicalculator.emi.controller.CalculadoraController;
import com.emicalculator.emi.dto.CalculoAposentadoriaDTO;
import com.emicalculator.emi.dto.CalculoFinanciamentoDTO;

@RestController
public class CalculadoraControllerImpl implements CalculadoraController {

	@Override
	public double calculoJurosSimples(double valorInicial, double porcentagemJuro, int tipoJuro, int periodo,
			int tipoPeriodo) {
		double taxaMensal;

		if (tipoJuro == 1) {
			taxaMensal = porcentagemJuro;
		} else {
			taxaMensal = porcentagemJuro / 12.0;
		}

		int periodoEmMeses;

		// Converter período para meses
		if (tipoPeriodo == 1) {
			// 1 = período em meses
			periodoEmMeses = periodo;
		} else {
			// 2 = período em anos → multiplicar por 12
			periodoEmMeses = periodo * 12;
		}

		// Fórmula juros simples: J = P * i * n
		double calculo = valorInicial * (taxaMensal / 100.0) * periodoEmMeses;

		return BigDecimal.valueOf(calculo).setScale(2, RoundingMode.HALF_UP).doubleValue();
	}

	@Override
	public double calculoJurosCompostos(double valorInicial, double valorMensal, double porcentagemJuro, int tipoJuro,
			int periodo, int tipoPeriodo) {

		// Converte taxa em decimal
		double taxa = porcentagemJuro / 100.0;

		double i; // taxa mensal
		int n; // número de meses

		// Converte taxa para mensal e período para meses
		if (tipoJuro == 1 && tipoPeriodo == 1) {
			i = taxa;
			n = periodo;
		} else if (tipoJuro == 1 && tipoPeriodo == 2) {
			i = taxa;
			n = periodo * 12;
		} else if (tipoJuro == 2 && tipoPeriodo == 1) {
			i = Math.pow(1 + taxa, 1.0 / 12.0) - 1;
			n = periodo;
		} else { // tipoJuro == 2 && tipoPeriodo == 2
			i = Math.pow(1 + taxa, 1.0 / 12.0) - 1;
			n = periodo * 12;
		}

		// Caso taxa zero
		if (Math.abs(i) < 1e-12) {
			return 0.0; // não rendeu juros
		}

		// Montante total com juros compostos e aportes
		double montante = valorInicial * Math.pow(1 + i, n);
		if (valorMensal > 0) {
			montante += valorMensal * ((Math.pow(1 + i, n) - 1) / i);
		}

		// Total investido = valor inicial + soma dos aportes
		double totalInvestido = valorInicial + valorMensal * n;

		return BigDecimal.valueOf(montante - totalInvestido).setScale(2, RoundingMode.HALF_UP).doubleValue();
	}

	@Override
	public CalculoAposentadoriaDTO calculoAposentadoria(double valorMensal, double valorInvestido,
			double valorPatrimonio, double porcentagemRenda, int idadeAtual, int anoAposentadoria,
			double rentabilidadeAnualProjetada, double gastoMensalAposentado) {

		// Validações iniciais
		if (idadeAtual >= anoAposentadoria || idadeAtual < 0 || anoAposentadoria < 0) {
			throw new IllegalArgumentException(
					"Idade atual deve ser menor que a idade de aposentadoria e ambas devem ser não negativas.");
		}
		if (rentabilidadeAnualProjetada < 0 || valorMensal < 0 || valorInvestido < 0 || valorPatrimonio < 0
				|| gastoMensalAposentado < 0) {
			throw new IllegalArgumentException("Valores financeiros e rentabilidade não podem ser negativos.");
		}

		// Se porcentagemRenda for fornecida, calcular valorMensal
		double aporteMensal = (porcentagemRenda > 0) ? (valorMensal * porcentagemRenda / 100.0) : valorMensal;

		// Capital inicial
		double capitalInicial = valorInvestido;

		// Conversão da rentabilidade anual para mensal
		double taxaMensal = Math.pow(1 + rentabilidadeAnualProjetada / 100.0, 1.0 / 12.0) - 1;

		// Período até a aposentadoria (em meses)
		int mesesParaAposentar = (anoAposentadoria - idadeAtual) * 12;

		// Cálculo do montante acumulado até a aposentadoria
		double montante = capitalInicial * Math.pow(1 + taxaMensal, mesesParaAposentar);
		if (aporteMensal > 0) {
			montante += aporteMensal * ((Math.pow(1 + taxaMensal, mesesParaAposentar) - 1) / taxaMensal);
		}

		// Cálculo do gasto mensal sustentável (perpetuidade)
		double gastoMensalSustentavel = montante * taxaMensal;

		// Herança (excedente do montante sobre o patrimônio desejado)
		double heranca = Math.max(montante - valorPatrimonio, 0);

		// Falta para a meta
		double faltaParaMeta = Math.max(valorPatrimonio - montante, 0);

		CalculoAposentadoriaDTO retorno = new CalculoAposentadoriaDTO();

		// Montando o resultado
		retorno.setPatrimonioFinal(Math.round(montante * 100.0) / 100.0); // Arredondar para 2 casas
		retorno.setGastoMensal(Math.round(gastoMensalSustentavel * 100.0) / 100.0);
		retorno.setValorHeranca(Math.round(heranca * 100.0) / 100.0);
		retorno.setValorMeta(Math.round(faltaParaMeta * 100.0) / 100.0); // Novo campo, se necessário

		return retorno;
	}

	@Override
	public CalculoFinanciamentoDTO calculoFinanciamento(double valorImovel, double valorEntrada, double porcentagemJuro,
			int tipoJuro, int prazo) {

		// Valor financiado
		double valorFinanciado = valorImovel - valorEntrada;

		// Converte taxa para decimal
		double taxa = porcentagemJuro / 100.0;

		// Define taxa mensal
		double taxaMensal;
		if (tipoJuro == 1) {
			// Juros já são mensais
			taxaMensal = taxa;
		} else {
			// Juros são anuais → converter para mensal
			taxaMensal = Math.pow(1 + taxa, 1.0 / 12.0) - 1;
		}

		int n = prazo; // prazo em meses

		// Fórmula da Tabela Price (prestação fixa)
		double pmt = (valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, n))) / (Math.pow(1 + taxaMensal, n) - 1);

		// Total pago ao longo do financiamento
		double totalPago = pmt * n;

		// Total de juros pagos
		double totalJuros = totalPago - valorFinanciado;

		// Preenche DTO
		CalculoFinanciamentoDTO retorno = new CalculoFinanciamentoDTO();
		retorno.setValorMensal(BigDecimal.valueOf(pmt).setScale(2, RoundingMode.HALF_UP).doubleValue());
		retorno.setValorTotal(BigDecimal.valueOf(totalPago).setScale(2, RoundingMode.HALF_UP).doubleValue());
		retorno.setJuros(BigDecimal.valueOf(totalJuros).setScale(2, RoundingMode.HALF_UP).doubleValue());

		return retorno;
	}



}
