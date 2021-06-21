import { Component} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Variable Declaration
  title = 'password-checker';
  remarks="";
  strengthText = '';
  flag = false;
  n:number=0;
  lenu: number=0;
  lenl:number=0;
  num:number=0;
  sc:number=0;
  ucr:number=0;
  lcr:number=0;
  nr:number=0;
  sl:number=0;
  sn:number=0;
  ss:number=0;
  score:number=0;
  
  scalc(val){
    this.score=0;
    this.n=0;
    this.lenu=0;
    this.lenl=0;
    this.num=0;
    this.sc=0;
    this.ucr=0;
    this.lcr=0;
    this.nr=0;
    this.sl=0;
    this.sn=0;
    this.ss=0;


    //Methods for finding frequency
    this.n=val.length;
    this.remarks="The Password is not Acceptable";
    this.lenu=val.replace(/[^A-Z]/g, "").length;
    this.lenl=val.replace(/[^a-z]/g, "").length;
    this.num=val.replace(/[^0-9]/g, "").length;
    this.sc=val.replace(/[a-zA-Z0-9]/g, "").length; 
    this.repeatnum(val);
    this.repeatuc(val);
    this.repeatlc(val);
    this.seql(val);
    this.seqnum(val);
    this.seqsym(val);

    //Methods for checking Password
    
    this.checkPW();
    this.scorecheck();
    this.finalscore();

    //Strength-Bar
    this.passstrength();
    }

    repeatnum(val){
      let sum=0;
      if(val.length!=0){
       for (var i = 0; i < this.n;i++){
        var curr = val.charCodeAt(i);
        if(curr>=48 && curr<=57)
          while (val[i] == val[i + 1]){
            i++;
            sum++;
            this.nr=sum;
          }
        }
      }
      else{
        sum=0;
        this.nr=sum;
      }
    }

    repeatuc(val){
      let sum=0;
      if(val.length!=0){
        for (var i = 0; i < this.n;i++){
          var curr = val.charCodeAt(i);
          if(curr>=65 && curr<=90)
            while (val[i] == val[i + 1]) {
              i++;
              sum++;
              this.ucr=sum;
            }
        }
      }
      else{
        sum=0;
        this.ucr=sum;
      }
    }

    repeatlc(val){
      let sum=0;
      if(val.length!=0){
        for (var i = 0; i < this.n;i++){
          var curr = val.charCodeAt(i);
            if(curr>=97 && curr<=122)
              while (val[i] == val[i + 1]) {
                i++;
                sum++;
                this.lcr=sum;
              } 
          }
      }
      else{
        sum=0;
        this.lcr=sum;
      }
    }

    seql(val){
      let sum=0;
      if(val.length!=0){
        for (var i = 0; i < this.n;i++){
          var curr = val.charCodeAt(i);
          var next = val.charCodeAt(i+1);
          var next1 = val.charCodeAt(i+2);
          if((curr>=65 && curr<=90) || (curr>=97 && curr<=122))
            if ((curr == next-1) || (curr==next-33) || (curr==next+31))
              if((next==next1-1) || (next==next1-33) || (next=next1+31)){ 
                sum++;
                this.sl=sum;
              }
        }
      }
      else{
        sum=0;
        this.sl=sum;
      }
    }

    seqnum(val){
      let sum=0;
      if(val.length!=0){
        for (var i = 0; i < this.n;i++){
          var curr = val.charCodeAt(i);
          var next = val.charCodeAt(i+1);
          var next1 = val.charCodeAt(i+2);
          if(curr>=48 && curr<=57)
            if (curr == next-1) 
              if(curr==next1-2){ 
                sum++;
                this.sn=sum;
              }
          }
      }
      else{
        sum=0;
        this.sn=sum;
      }
    }

    seqsym(val){
      let sum=0;
      if(val.length!=0){
        for (var i = 0; i < this.n;i++){
          var curr = val.charCodeAt(i);
          var next = val.charCodeAt(i+1);
          var next1 = val.charCodeAt(i+2);
          if(curr>=33 && curr<=47)
            if (curr == next-1) 
              if(curr==next1-2){ 
                sum++;
                this.ss=sum;
              }
          }
      }
      else{
        sum=0;
        this.ss=sum;
      }
    }

    scorecheck(){
        if (this.lenu+this.lenl==this.n)
          this.score= this.score-this.n;
        if(this.num==this.n)
          this.score= this.score-this.n;
        if(this.ucr>0)
          this.score=this.score-this.ucr*2;
        if(this.lcr>0)
          this.score=this.score-this.lcr*2;
        if(this.nr>0)
          this.score=this.score-this.nr*2;
        if(this.sl>0)
          this.score=this.score-this.sl*3;
        if(this.sn>0)
          this.score=this.score-this.sn*3;
        if(this.ss>0)
          this.score=this.score-this.ss*3;
    }

    checkPW() {
      this.score=this.score+this.n*4;
      if(this.n >= 8) {
          this.flag=true;
      }
      var count  = 0;
      if(this.lenu > 0) {
        this.score+=(this.n-this.lenu)*2;
        count++;
      }
      if(this.lenl > 0) {
        this.score+=(this.n-this.lenl)*2;
        count++;
      }
      if(this.num > 0) {
        this.score+=this.num*4;
        count++;
      }
      if(this.sc > 0) {
        this.score+=this.sc*6;
        count++;
      }
      if((count > 2)&&(this.flag==true)) {
        this.score = this.score + (this.n * 2);
        this.remarks="The Password is Acceptable";
      }   
      
  }
  finalscore(){
    if (this.score>100)
      this.score=100;
    else if(this.score<0)
      this.score=0;
    }
  passstrength(){
    const veryweak=document.querySelector(".very-weak");
    const weak=document.querySelector(".weak");
    const medium=document.querySelector(".medium");
    const strong=document.querySelector(".strong");
    const verystrong=document.querySelector(".very-strong");

    veryweak.classList.remove("active");
    weak.classList.remove("active");
    medium.classList.remove("active");
    verystrong.classList.remove("active");
    strong.classList.remove("active");

    if(this.score==0)
    {}
    else if(this.score>0 && this.score<20){
      veryweak.classList.add("active");
    }
    else if(this.score<40 && this.score>=20){
      veryweak.classList.add("active");
      weak.classList.add("active");
    }
    else if(this.score<60 && this.score>=40){
      veryweak.classList.add("active");
      weak.classList.add("active");
      medium.classList.add("active");
    }
    else if(this.score<90 && this.score>=60){
      veryweak.classList.add("active");
      weak.classList.add("active");
      medium.classList.add("active");
      strong.classList.add("active");
    }
    else{
      veryweak.classList.add("active");
      weak.classList.add("active");
      medium.classList.add("active");
      verystrong.classList.add("active");
      strong.classList.add("active");
    }
  }
}


