import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formCadastro: FormGroup;
  usuario: Usuario = new Usuario();

  mensagens = {
    nome: [
      {tipo:'required', mensagem: 'O campo Nome é obrigatório!'},
      {tipo:'minLength', mensagem: 'O campo Nome precisa ter pelo menos 3 caracteres!'}
    ],
    cpf:[
      {tipo:'required', mensagem: 'O campo CPF é obrigatório!'},
    ],
    email:[
      {tipo:'required', mensagem: 'O campo EMAIL é obrigatório!'},
      {tipo:'email', mensagem: 'E-mail inválido!'}
    ],
    senha:[
      {tipo:'required', mensagem: 'O campo SENHA é obrigatório!'},
    ],
    confirmaSenha:[
      {tipo:'required', mensagem: 'O campo CONFIRMAR SENHA é obrigatório!'},
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
   }

  ngOnInit() {
  }

  async salvarCadastro(){
    if(this.formCadastro.valid){
      this.usuario.nome = this.formCadastro.value.nome;
      this.usuario.cpf = this.formCadastro.value.cpf;
      this.usuario.email = this.formCadastro.value.email;
      this.usuario.senha = this.formCadastro.value.senha;
      await this.storageService.set(this.usuario.email, this.usuario);
      this.route.navigateByUrl('/tabs/tab1');
    }else{
      alert('Formulário inválido!');
    }
  }

}
