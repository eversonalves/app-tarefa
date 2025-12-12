import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tarefas: any[] = []; // Array para armazenar as tarefas (terá o nome da tarefa e o status verdadeiro ou falso)

  constructor(
    private alertCtrl: AlertController,
    private toast: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {
    let tarefaJson = localStorage.getItem('tarefaDb');
    if (tarefaJson != null) {
      this.tarefas = JSON.parse(tarefaJson);
    }
    // console.log(this.tarefas);
  }

  async addTarefa() {
    const alerta = await this.alertCtrl.create({
      header: 'O que você quer fazer?',
      inputs: [
        {
          name: 'txtnome',
          type: 'text',
          placeholder: 'digite a tarefa desejada',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'light',
          handler: () => {
            console.log('Você cancelou?!');
          },
        },
        {
          text: 'OK',
          handler: (form) => {
            this.add(form.txtnome);
          },
        },
      ],
    });
    alerta.present();
  }

   async add(nova: any) {
    if (nova.trim().length < 1) {
      const toast = await this.toast.create({
        message: 'Informe uma tarefa.',
        duration: 2000,
        color: 'warning',
        position: 'top',
      });
      toast.present();
    } else {
      let tarefa = { nome: nova, status: false };
      this.tarefas.push(tarefa);
      this.atualizarStorage(); // Armazenar a tarefa no localStorage
      const toast = await this.toast.create({
        message: 'Tarefa adicionada com sucesso!',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
      toast.present();
    }
  }

  atualizarStorage() {
    localStorage.setItem('tarefaDb', JSON.stringify(this.tarefas));
  }

  async abrirOpcoes(tarefa: any) {
    const actsheet = await this.actionSheetCtrl.create({
      header: 'Escolha uma opção:',
      buttons: [
        {
          text: tarefa.status ? 'Desmarcar' : 'Marcar',
          icon: tarefa.status ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            tarefa.status = !tarefa.status;
            this.atualizarStorage();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    actsheet.present();
  }

   excluir(tarefa: any) {
    this.tarefas = this.tarefas.filter((res) => tarefa != res);
    this.atualizarStorage();
  }

  abriDetalhes(tarefa:any){
    this.router.navigateByUrl('/detalhes',{   // navega para a rota /detalhes passando o objeto "tarefa".
      state: {
        tarefaSelecionada: tarefa    // Está é a chave que será usada na outra pagina.
      }
    })
  }

}
