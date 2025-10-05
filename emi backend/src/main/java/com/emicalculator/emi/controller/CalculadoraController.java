package com.emicalculator.emi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.emicalculator.emi.dto.CalculoAposentadoriaDTO;
import com.emicalculator.emi.dto.CalculoFinanciamentoDTO;

@CrossOrigin(origins = "*")
@RequestMapping("/emi/calculos")
public interface CalculadoraController {

	@GetMapping("/calculoJurosSimples")
	public double calculoJurosSimples(double valorInicial, double porcentagemJuro, int tipoJuro, int periodo,
			int tipoPeriodo);

	@GetMapping("/calculoJurosCompostos")
	public double calculoJurosCompostos(double valorInicial, double valorMensal, double porcentagemJuro, int tipoJuro,
			int periodo, int tipoPeriodo);

	@GetMapping("/calculoAposentadoria")
	public CalculoAposentadoriaDTO calculoAposentadoria(double valorMensal, double valorInvestido, double valorPatrimonio,
			double porcentagemRenda, int idadeAtual, int anoAposentadoria, double rentabilidadeAnualProjetada,
			double gastoMensalAposentado);

	@GetMapping("/calculoFinanciamento")
	public CalculoFinanciamentoDTO calculoFinanciamento(double valorImovel, double valorEntrada, double porcentagemJuro, int tipoJuro,
			int prazo);

}
