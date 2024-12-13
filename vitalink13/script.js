document.addEventListener('DOMContentLoaded', function () {
    // Registro de Sintomas
    document.getElementById('form-sintomas').addEventListener('submit', function (e) {
        e.preventDefault();

        const sintoma = document.getElementById('sintoma').value;
        const intensidade = document.getElementById('intensidade').value;
        const data = document.getElementById('data').value;

        const historico = document.getElementById('historico-sintomas');
        const item = document.createElement('li');
        item.textContent = `Sintoma: ${sintoma}, Intensidade: ${intensidade}, Data: ${data}`;

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => item.remove());
        item.appendChild(btnExcluir);

        historico.appendChild(item);
        atualizarGrafico(sintoma, intensidade);
    });

    // Configuração do Gráfico
    const ctx = document.getElementById('graficoSintomas').getContext('2d');
    let dadosGrafico = {
        labels: [],
        datasets: [{
            label: 'Intensidade dos Sintomas',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    let grafico = new Chart(ctx, {
        type: 'bar',
        data: dadosGrafico
    });

    function atualizarGrafico(sintoma, intensidade) {
        dadosGrafico.labels.push(sintoma);
        dadosGrafico.datasets[0].data.push(intensidade);
        grafico.update();
    }

    // Exportar para PDF
    document.getElementById('exportarPdf').addEventListener('click', function () {
        const doc = new jsPDF();
        const historico = document.getElementById('historico-sintomas').innerText;
        doc.text(historico, 10, 10);
        doc.save('historico-sintomas.pdf');
    });

    // Avaliação de Saúde
    document.getElementById("form-saude").addEventListener("submit", function (e) {
        e.preventDefault();

        let total = 0;

        const respostas = new FormData(e.target);
        respostas.forEach((value) => {
            total += parseInt(value);
        });

        let diagnostico = "";
        if (total >= 8) {
            diagnostico = "Os sintomas indicam uma condição séria. Recomendamos procurar um médico imediatamente.";
        } else if (total >= 5) {
            diagnostico = "Os sintomas podem indicar uma condição moderada. Consulte um médico se piorar.";
        } else if (total >= 2) {
            diagnostico = "Seus sintomas são leves, mas monitore a situação.";
        } else {
            diagnostico = "Você parece estar saudável. Continue cuidando de sua saúde!";
        }

        document.getElementById("diagnostico").textContent = diagnostico;
    });

    // Registro de Remédios
    document.getElementById('form-remedios').addEventListener('submit', function (e) {
        e.preventDefault();

        const remedio = document.getElementById('remedio').value;
        const horario = document.getElementById('horario').value;

        const listaRemedios = document.getElementById('lista-remedios');
        const item = document.createElement('li');
        item.textContent = `Remédio: ${remedio}, Horário: ${horario}`;

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => item.remove());
        item.appendChild(btnExcluir);

        listaRemedios.appendChild(item);

        // Limpar campos após adicionar
        document.getElementById('remedio').value = '';
        document.getElementById('horario').value = '';
    });
});
document.getElementById('form-remedios').addEventListener('submit', function (e) {
    e.preventDefault();

    const remedio = document.getElementById('remedio').value;
    const horario = document.getElementById('horario').value;

    const listaRemedios = document.getElementById('lista-remedios');
    const item = document.createElement('li');
    item.textContent = `Remédio: ${remedio}, Horário: ${horario}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => item.remove());

    // Criando o ícone do sininho de notificação
    const sininho = document.createElement('span');
    sininho.classList.add('sininho');
    sininho.textContent = '🔔';  // Ícone de notificação fictício

    item.appendChild(sininho); // Adiciona o sininho à lista
    item.appendChild(btnExcluir); // Adiciona o botão de excluir

    listaRemedios.appendChild(item);

    // Limpar campos após adicionar
    document.getElementById('remedio').value = '';
    document.getElementById('horario').value = '';
});
