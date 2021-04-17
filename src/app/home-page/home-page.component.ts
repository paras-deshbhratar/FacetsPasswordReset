import {Component, OnInit, ɵɵqueryRefresh} from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSelectChange} from "@angular/material/select";
import { PasswordUpdateService } from '../services/password-update.service';


interface Account {
  value: string;
  viewValue: string;
}

interface Environment {
  value: string;
  viewValue: string;
}

export class Facets {
  urgency: string;
  dataCenter: string;
  city: string;
  add: string;
}
interface Message {
  message: string;    
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentActiveForm: string;
  successMsg: boolean;
  errorMsg: string;
  activePatientList : any[] = [];
  defaultVal: any;
  accountDropDown = '';
  error = '';
  
  //accounts=['domain', 'application', 'database']; 

   accounts: Account[] = [     
     {value: 'domain', viewValue: 'Domain Account'},
     {value: 'application', viewValue: 'Application Account'},
     {value: 'database', viewValue: 'Database Account'}
   ];

  dbEnvironments: Environment[] = [    
    {value: 'Facets-570-DEVRpt', viewValue: 'Facets-570-DEVRpt'},
    {value: 'Facets-570-PPMORpt', viewValue: 'Facets-570-PPMORpt'},
    {value: 'Facets-570-PRODRpt', viewValue: 'Facets-570-PRODRpt'},
    {value: 'Facets-570-TESTRpt', viewValue: 'Facets-570-TESTRpt'}
  ];

  appEnvironments: Environment[] = [    
    {value: 'Facets-570-DEV', viewValue: 'Facets-570-DEV'},
    {value: 'Facets-570-PPMO', viewValue: 'Facets-570-PPMO'},
    {value: 'Facets-570-PROD', viewValue: 'Facets-570-PROD'},
    {value: 'Facets-570-TEST', viewValue: 'Facets-570-TEST'}
  ];

   constructor(private http: HttpClient,
    private passwordUpdate: PasswordUpdateService) {
  }
  showLoader: boolean = false;
  ngOnInit() {
    this.defaultVal = {
      urgency: "High",
      dataCenter: "HOC3",
      
    };

  }

  onFormSelection(matSelectChange: MatSelectChange) { 
    this.error='';   
    this.currentActiveForm = matSelectChange.value;
  }

  
  onSubmitApplicationForm(applicationForm: NgForm) {     
      //const facets = new Facets(); 
      this.appRequest(applicationForm);  
     
  }

  onSubmitDatabaseForm(databaseForm: NgForm) {     
    this.dbRequest(databaseForm);    
  }

  onSubmitDomainForm(domainForm: NgForm) {     
    this.domainRequest(domainForm);    
  }


   appRequest(applicationForm: NgForm) {     
    this.accountDropDown = '';
    this.showLoader = true;
    this.currentActiveForm = 'none';  
    this.passwordUpdate.appPasswordUpdate(applicationForm, this.defaultVal.urgency, this.defaultVal.dataCenter).subscribe(
       data => {
         console.log(data); 
         this.showLoader = false;
         this.currentActiveForm = 'none';
         this.error = "your request successfully completed";               
       },
       error => {            
           console.log("========>"+error);
           //this.error = error.error.message;
           this.currentActiveForm = 'none';
           this.showLoader = false;
           this.error = "Error occured while processing request...";        
           
       });   
  }


  dbRequest (dbForm: NgForm) {    
    this.accountDropDown = '';
    this.showLoader = true;
    //this.currentActiveForm = 'none';   
    this.passwordUpdate.dbPasswordUpdate(dbForm, this.defaultVal.urgency, this.defaultVal.dataCenter).subscribe(
       data => {
         console.log(data); 
         this.showLoader = false;
         this.currentActiveForm = 'none';
         this.error = "your request successfully completed";  
         this.error =data.message;             
       },
       error => {            
           console.log("========>"+error);
           //this.error = error.error.message;
           this.currentActiveForm = 'none';
           this.showLoader = false;           
           this.error = "Error occured while processing request..."; 
           
       });   
    
  }


  domainRequest(appForm: NgForm){    
    this.accountDropDown = '';
    this.showLoader = true;
    this.currentActiveForm = 'none';   
    this.passwordUpdate.domainPasswordUpdate(appForm, this.defaultVal.urgency, this.defaultVal.dataCenter).subscribe(
       data => {
         console.log(data); 
         this.currentActiveForm = 'none';
         this.showLoader = false;
         this.error = "your request successfully completed";                      
       },
       error => {            
           console.log("========>"+error);
           //this.error = error.error.message;
           this.currentActiveForm = 'none';
           this.showLoader = false;
           this.error = "Error occured while processing request..."; 
           
       }); 
    
  }
}





