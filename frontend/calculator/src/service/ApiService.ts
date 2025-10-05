// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:8080/emi/calculos'; // mude para IP se for celular

    constructor(private http: HttpClient) { }

    calcularJurosSimples(valorInicial: number, porcentagemJuro: number, tipoJuro: number, periodo: number, tipoPeriodo: number) {
        return this.http.get(this.baseUrl + "/calculoJurosSimples", {
            params: {
                valorInicial,
                porcentagemJuro,
                tipoJuro,
                periodo,
                tipoPeriodo
            }
        });
    }

    calcularJurosCompostos(valorInicial: number, valorMensal: number, porcentagemJuro: number, tipoJuro: number, periodo: number, tipoPeriodo: number) {
        return this.http.get(this.baseUrl + "/calculoJurosCompostos", {
            params: {
                valorInicial,
                valorMensal,
                porcentagemJuro,
                tipoJuro,
                periodo,
                tipoPeriodo
            }
        });
    }

    calcularAposentadoria(valorMensal: number, valorInvestido: number, valorPatrimonio: number, porcentagemRenda: number, idadeAtual: number, anoAposentadoria: number, rentabilidadeAnualProjetada: number, gastoMensalAposentado: number) {
        return this.http.get(this.baseUrl + "/calculoAposentadoria", {
            params: {
                valorMensal,
                valorInvestido,
                valorPatrimonio,
                porcentagemRenda,
                idadeAtual,
                anoAposentadoria,
                rentabilidadeAnualProjetada,
                gastoMensalAposentado
            }
        });
    }

    calculoFinanciamento(valorImovel: number, valorEntrada: number, porcentagemJuro: number, tipoJuro: number, prazo: number) {
        return this.http.get(this.baseUrl + "/calculoFinanciamento", {
            params: {
                valorImovel,
                valorEntrada,
                porcentagemJuro,
                tipoJuro,
                prazo
            }
        });
    }

}
