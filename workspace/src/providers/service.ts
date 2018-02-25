import {Injectable} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class Service {

  public companies: Array<any>;
  public id: string;
  public binInfo: Array<any>;
  constructor(public http: Http,public alertCtrl: AlertController) {}

  getAllCompanies(){
    return this.http.get("http://ec2-34-216-159-143.us-west-2.compute.amazonaws.com/html/api/company/read.php");
  }

  getBinInfo(id:string){
    return this.http.get("http://ec2-34-216-222-53.us-west-2.compute.amazonaws.com/api/bin/readOne.php?id=1");
  }

  postProblem(problem: string){
    let headers = new Headers( { 'Content-Type' : 'application/json' }); 
    let options = new RequestOptions({ headers: headers }); 
    this.http.post('ec2-34-216-222-53.us-west-2.compute.amazonaws.com/api/report/add.php', 
        { 
            binID : this.id,
            userID : "1",
            problem : problem,
            date : new Date()
        }).subscribe(data => console.log(data)
            , error => {
                console.log(error.json());
        });

  }
  doAlert(title: string, message: string) {

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}
