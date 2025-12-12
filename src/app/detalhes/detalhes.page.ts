import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {

  tarefa: any;  // está variável deve armazenar a tarefa recebida pela rota

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { 
    const nav = this.router.getCurrentNavigation();

   if(nav?.extras.state && nav.extras.state['tarefaSelecionada']){     // verifica se o estado da navegação existe e contém o objeto 'tarefa'    
      this.tarefa = nav.extras.state['tarefaSelecionada'];
   }else{
      this.navCtrl.back();    // opcionalmente volta para a url de origem
   }

  }

  ngOnInit() {
    console.log('Tarefa recebida', this.tarefa);
  }

   getTitulo(){    // Exemplo de função para consumir os dados que vieram no objeto tarefa
    return this.tarefa?this.tarefa.nome : 'Nenhuma tarefa encontrada';
   }

}
