import { Component, OnInit, ViewChild } from '@angular/core';
import {CountdownComponent} from 'ngx-countdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timeController';
  colors = ["button-blue","button-orange","button-red","button-yellow","button-green","button-pink"];
  gameReference: any = "";
  initialTimeConfig: object = {'leftTime': 5, 'demand': true};
  runningTime: boolean = false;
  matchCompleted: boolean = false;
  playerToken: string = '';

  @ViewChild('playerOne', { static: false }) private countdownPlayerOne: any = CountdownComponent;
  @ViewChild('playerTwo', { static: false }) private countdownPlayerTwo: any = CountdownComponent;

  ngOnInit(): void {}

  changeColor(color: string, player: string) {
    if (player === "second-player") {
      const getterSecondPlayerController = document.getElementById('playerTwo-getter-js');
      getterSecondPlayerController?.setAttribute('class', `player player-two ${color}`);
    } else if (player === "first-player") {
      const getterSecondPlayerController = document.getElementById('playerOne-getter-js');
      getterSecondPlayerController?.setAttribute('class', `player player-one ${color}`);
    }
  }

  startTimer(roundPlayer: any): void {
    if (!this.matchCompleted) {
      this.runningTime = true;
      if (roundPlayer === 'first-player') {
        this.countdownPlayerTwo.pause();
        this.countdownPlayerOne.begin();
        this.playerToken = roundPlayer;
      } else if (roundPlayer === 'second-player') {
        this.countdownPlayerOne.pause();
        this.countdownPlayerTwo.begin();
        this.playerToken = roundPlayer;
      }
    }
  }

  restartTimer(): void {
    const getterFirstPlayerController = document.getElementById('playerOne-getter-js');
    const getterSecondPlayerController = document.getElementById('playerTwo-getter-js');
    this.runningTime = false;
    this.matchCompleted = false;
    this.countdownPlayerOne.restart();
    this.countdownPlayerTwo.restart();

    getterSecondPlayerController?.setAttribute('class', 'player player-two' );
    getterFirstPlayerController?.setAttribute('class', 'player player-one');
  }

  pauseTimer(): void {
    this.runningTime = false;
    this.countdownPlayerOne.pause();
    this.countdownPlayerTwo.pause();
  }

  checkTimesUp($event: any, player: string) {
    if ($event.action === 'done') {
      this.runningTime = false;
      this.matchCompleted = true;

      if (player === "second-player") {
        const getterSecondPlayerController = document.getElementById('playerTwo-getter-js');
        getterSecondPlayerController?.setAttribute('class', 'player player-two finished' );
      } else if (player === "first-player") {
        const getterFirstPlayerController = document.getElementById('playerOne-getter-js');
        getterFirstPlayerController?.setAttribute('class', 'player player-one finished');
      }
    }
  }
}
