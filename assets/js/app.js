class Contato {
    constructor(nome, telefone, email = '', foto = 'assets/imagens/perfil.png') {
        this.id = uuid.v4();
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.foto = foto; // Adiciona a foto do contato
    }
}

class GerenciadorContatos {
    constructor() {
        this.contatos = [
            new Contato('Minha Ex (Luiza)','87-99906-6678','','assets/imagens/luiza-sonza.png'),
            new Contato('Primo Lima','71-99940-0420','','assets/imagens/gustavo.png'),
            new Contato('Menino Ney','71-99975-5023','','assets/imagens/ney.png'),
            new Contato('Tiringa','75-99923-7075','','assets/imagens/tiringa.png'),
           
        ];
        this.lista = document.getElementById('contact-list');
        this.search = document.getElementById('search');
        this.contactDetailsModal = document.getElementById('contact-modal');
        this.contactPhoto = document.getElementById('contact-photo');
        this.contactNameDisplay = document.getElementById('contact-name-display');
        this.contactName = document.getElementById('contact-name');
        this.contactPhone = document.getElementById('contact-phone');
        this.contactEmail = document.getElementById('contact-email');
        this.contactSaveBtn = document.getElementById('contact-save-btn');
        this.contactCloseBtn = document.querySelector('#contact-modal .close-btn');

        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalName = document.getElementById('modal-name');
        this.modalPhone = document.getElementById('modal-phone');
        this.modalEmail = document.getElementById('modal-email');
        this.modalSubmitBtn = document.getElementById('modal-submit-btn');
        this.closeBtn = document.querySelector('#modal .close-btn');

        document.getElementById('add-contact-btn').addEventListener('click', () => this.abrirModal());
        this.closeBtn.addEventListener('click', () => this.fecharModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.fecharModal();
        });
        this.search.addEventListener('input', this.buscarContato.bind(this));

        this.contactCloseBtn.addEventListener('click', () => this.fecharContactModal());
        this.contactDetailsModal.addEventListener('click', (e) => {
            if (e.target === this.contactDetailsModal) this.fecharContactModal();
        });
        this.contactSaveBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão do botão
            this.salvarContato(this.contactSaveBtn.dataset.contatoId);
        });

        this.atualizarLista();
    }

    abrirModal(contato = null) {
        this.modalTitle.textContent = 'Adicionar Novo Contato';
        this.modalName.value = '';
        this.modalPhone.value = '';
        this.modalEmail.value = '';
        this.modalSubmitBtn.textContent = 'Adicionar Contato';
        this.modalSubmitBtn.onclick = this.adicionarContato.bind(this);

        this.modal.classList.add('modal-visible');
        this.modal.classList.remove('modal-hidden');
    }

    fecharModal() {
        this.modal.classList.add('modal-hidden');
        this.modal.classList.remove('modal-visible');
    }

    abrirContactModal(contato) {
        this.contactNameDisplay.textContent = contato.nome;
        this.contactName.value = contato.nome;
        this.contactPhone.value = contato.telefone;
        this.contactEmail.value = contato.email;
        this.contactPhoto.src = contato.foto; // Atualiza a foto do contato
        this.contactSaveBtn.dataset.contatoId = contato.id; // Armazena o ID do contato no botão de salvar

        this.contactDetailsModal.classList.add('modal-visible');
        this.contactDetailsModal.classList.remove('modal-hidden');
    }

    fecharContactModal() {
        this.contactDetailsModal.classList.add('modal-hidden');
        this.contactDetailsModal.classList.remove('modal-visible');
    }

    adicionarContato(event) {
        event.preventDefault();
        const nome = this.modalName.value;
        const telefone = this.modalPhone.value;
        const email = this.modalEmail.value;

        if (nome && telefone) {
            const contato = new Contato(nome, telefone, email);
            this.contatos.push(contato);
            this.atualizarLista();
            this.fecharModal();
        }
    }

    salvarContato(id) {
        const contato = this.contatos.find(contato => contato.id === id);
        if (contato) {
            contato.nome = this.contactName.value;
            contato.telefone = this.contactPhone.value;
            contato.email = this.contactEmail.value;
            this.atualizarLista();
            this.fecharContactModal();
        }
    }

    removerContato(id) {
        this.contatos = this.contatos.filter(contato => contato.id !== id);
        this.atualizarLista();
        this.showNotification();
    }

    buscarContato() {
        const termo = this.search.value.toLowerCase();
        const contatosFiltrados = this.contatos.filter(contato =>
            contato.nome.toLowerCase().includes(termo)
        );
        this.atualizarLista(contatosFiltrados);
    }

    atualizarLista(contatos = this.contatos) {
        this.lista.innerHTML = '';
        contatos.forEach(contato => {
            const li = document.createElement('li');

            const contactMain = document.createElement('div');
            contactMain.classList.add('contact-main');

            const img = document.createElement('img');
            img.classList.add('contact-img');
            img.src = contato.foto;
            contactMain.appendChild(img);

            const nameSpan = document.createElement('span');
            nameSpan.textContent = contato.nome;
            contactMain.appendChild(nameSpan);

            li.appendChild(contactMain);

            const telefoneSpan = document.createElement('span');
            telefoneSpan.textContent = contato.telefone;
            li.appendChild(telefoneSpan);

            const botaoRemover = document.createElement('span');
            botaoRemover.textContent = 'delete';
            botaoRemover.classList.add('delete');
            botaoRemover.classList.add('material-symbols-outlined')
            botaoRemover.onclick = (e) => {
                e.stopPropagation();
                this.removerContato(contato.id);
            };

            li.appendChild(botaoRemover);
            li.onclick = () => this.abrirContactModal(contato);

            this.lista.appendChild(li);
        });
    }
    showNotification() {
        const notification = document.getElementById('notification');
        notification.style.opacity = 1;
    
        setTimeout(() => {
            notification.style.opacity = 0;
        }, 2000); // Exibe a notificação por 5 segundos
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GerenciadorContatos();
});
