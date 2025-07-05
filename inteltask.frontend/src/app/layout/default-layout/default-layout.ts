import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-default-layout',
  imports: [ Header, RouterOutlet, Footer ],
  templateUrl: './default-layout.html',
  styleUrl: './default-layout.scss'
})
export class DefaultLayout {

}
