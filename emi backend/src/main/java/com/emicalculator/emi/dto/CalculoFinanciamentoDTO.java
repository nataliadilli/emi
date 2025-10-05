package com.emicalculator.emi.dto;

public class CalculoFinanciamentoDTO {
    private double valorMensal; 
    private double valorTotal;  
    private double juros;    

    public double getValorMensal() {
        return valorMensal;
    }
    public void setValorMensal(double valorMensal) {
        this.valorMensal = valorMensal;
    }
    public double getValorTotal() {
        return valorTotal;
    }
    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
    public double getJuros() {
        return juros;
    }
    public void setJuros(double juros) {
        this.juros = juros;
    }
}
