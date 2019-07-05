import { Component, OnInit } from '@angular/core';
import { QueuesService } from '../../services/queues.service';
import { FormControl, FormGroup, Validators, MinLengthValidator } from '@angular/forms';
import { User, IUser } from "../../interfaces/iuser"


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})



export class TableComponent implements OnInit {

  queues: IUser[];

  loginForm = new FormGroup({
    player1name: new FormControl('', Validators.required), //Sets default
    player2name: new FormControl(''),
    gameRules: new FormControl(0)
  });


  constructor(private queue: QueuesService) {

  }
  ngOnInit(): void {

    this.clicked();
  }

  p1Name;
  p2Name;
  ruleSet;
  clicked() {
    this.queue.getUserData()
      .subscribe((data) => {

        this.queues = data;
        // //for(var x = 0; x < data.length; x++){
        // this.p1Name = data[0].player1name;
        // //}
        // this.p2Name = data[0].player2name;
        // this.ruleSet = data[0].gameRules;
        //console.log(data[0].id);
      });
  }


  clicked2() {
    const user: User = this.loginForm.value;

    this.queue.postUserData("http://localhost:8080/addQueue", user).subscribe((x) => {
      console.log('POST REQUEST COMPLETE', x);
      this.clicked();
    })
  }

  delete(user: IUser) {
    // const user: User = this.loginForm.value;

    this.queue.deleteUserData(user).subscribe((x) => {
      console.log('Delete complete', x);
      this.clicked();
    })
  }

  findOne() {
    const user: User = this.loginForm.value;
    console.log(user._id);
    this.queue.getOne(user)
      .subscribe((data) => {
        console.log(data);
      });
  }
}



