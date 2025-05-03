// script.js
const { jsPDF } = window.jspdf;

function atualizarTotal(input) {
    const item = input.closest('.item-orcamento');
    const quantidade = item.querySelector('.qnt').value;
    const valorUnitario = item.querySelector('.valor-unitario').value;
    const total = item.querySelector('.total');
    total.value = (quantidade * valorUnitario).toFixed(2);
    atualizarTotalOrcamento();
}

function adicionarItem() {
    const novoItem = document.querySelector('.item-orcamento').cloneNode(true);
    novoItem.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById('itens-orcamento').appendChild(novoItem);
}

function removerItem(button) {
    const item = button.closest('.item-orcamento');
    item.remove();
    atualizarTotalOrcamento();
}

function atualizarTotalOrcamento() {
    const itens = document.querySelectorAll('.item-orcamento');
    let total = 0;
    itens.forEach(item => {
        total += parseFloat(item.querySelector('.total').value || 0);
    });

    const acrescimo = parseFloat(document.getElementById('acrescimo').value || 0);
    const desconto = parseFloat(document.getElementById('desconto').value || 0);
    total = total + acrescimo - desconto;

    document.getElementById('total-orcamento').innerText = total.toFixed(2);
}

function gerarPDF() {
    const doc = new jsPDF();

    // Dados do Emissor
    const nomeEmissor = document.getElementById('nome-emissor').value;
    const cpfEmissor = document.getElementById('cpf').value;
    const enderecoEmissor = document.getElementById('endereco-emissor').value;

    // Dados do Cliente
    const nomeCliente = document.getElementById('nome-cliente').value;
    const cpfCliente = document.getElementById('cpf-cliente').value;
    const enderecoCliente = document.getElementById('endereco-cliente').value;
    const telefone = document.getElementById('telefone').value;
    const emailCliente = document.getElementById('email-cliente').value;

    // Dados do Orçamento
    const numeroOrcamento = document.getElementById('numero-orcamento').value;
    const dataOrcamento = document.getElementById('data-orcamento').value;
    const validoAte = document.getElementById('valido-ate').value;
    const acrescimo = document.getElementById('acrescimo').value;
    const motivoAcrescimo = document.getElementById('motivo-acrescimo').value;
    const desconto = document.getElementById('desconto').value;
    const motivoDesconto = document.getElementById('motivo-desconto').value;
    const formaPagamento = document.getElementById('forma-pagamento').value;
    const observacoes = document.getElementById('observacoes').value;
    const totalOrcamento = document.getElementById('total-orcamento').innerText;

    // Adicionando dados ao PDF
    doc.text('Nome Da Loja', 20,10)
    doc.text('Orçamento', 20, 20);
    doc.text(`Nome do Emissor: ${nomeEmissor}`, 20, 30);
    doc.text(`CPF/CNPJ do Emissor: ${cpfEmissor}`, 20, 40);
    doc.text(`Endereço do Emissor: ${enderecoEmissor}`, 20, 50);

    doc.text('Dados do Cliente', 20, 60);
    doc.text(`Nome do Cliente: ${nomeCliente}`, 20, 70);
    doc.text(`CPF/CNPJ do Cliente: ${cpfCliente}`, 20, 80);
    doc.text(`Endereço do Cliente: ${enderecoCliente}`, 20, 90);
    doc.text(`Telefone: ${telefone}`, 20, 100);
    doc.text(`E-mail: ${emailCliente}`, 20, 110);

    doc.text('Dados do Orçamento', 20, 120);
    doc.text(`Número do Orçamento: ${numeroOrcamento}`, 20, 130);
    doc.text(`Data do Orçamento: ${dataOrcamento}`, 20, 140);
    doc.text(`Válido até: ${validoAte}`, 20, 150);
    doc.text(`Acréscimo: ${acrescimo} (Motivo: ${motivoAcrescimo})`, 20, 160);
    doc.text(`Desconto: ${desconto} (Motivo: ${motivoDesconto})`, 20, 170);
    doc.text(`Forma de Pagamento: ${formaPagamento}`, 20, 180);
    doc.text(`Observações: ${observacoes}`, 20, 190);

    // Adicionar itens do orçamento
    doc.text('Itens do Orçamento:', 20, 200);
    const itens = document.querySelectorAll('.item-orcamento');
    let yPosition = 210;
    itens.forEach((item, index) => {
        const produtoServico = item.querySelector('.produto-servico').value;
        const qnt = item.querySelector('.qnt').value;
        const valorUnitario = item.querySelector('.valor-unitario').value;
        const total = item.querySelector('.total').value;

        doc.text(`${index + 1}. ${produtoServico} - Quantidade: ${qnt}, Valor Unitário: R$ ${valorUnitario}, Total: R$ ${total}`, 20, yPosition);
        yPosition += 10;
    });

    // Adicionar total do orçamento
    doc.text(`Total do Orçamento: R$ ${totalOrcamento}`, 20, yPosition + 10);

    // Salvar o PDF
    doc.save('orcamento.pdf');
}
