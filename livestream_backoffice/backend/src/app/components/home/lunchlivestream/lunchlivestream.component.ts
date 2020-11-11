import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core';
import { EventService } from 'src/app/shared/service/event.service';
import { environment } from 'src/environments/environment.prod';
import { event } from 'src/app/shared/data/event';
import { LivestreamService } from 'src/app/shared/service/livestream.service';
import * as moment from 'moment'; // add this 1 of 4


@Component({
  selector: 'app-lunchlivestream',
  templateUrl: './lunchlivestream.component.html',
})

export class LunchlivestreamComponent implements OnInit {
public events ;
public boolean ;
  ngOnInit() {
    this.getall() ;    
}
  constructor(private eventservice : EventService ,private  streamservice : LivestreamService ) {
    this.events = [] ;
    this.boolean = false ;
  }

  getall() {
    this.events = []
    this.eventservice.get().subscribe(data => {
      data.forEach(element => {
        element.image = environment.patheventimage + element.image
        var date = new Date()
        var a = moment(element.date);
        var b = moment(date);
        if (b.diff(a, 'days') <= 0) {

          console.log(element.title);
          
          if(!this.events.includes(element))
          {if (b.diff(a, 'hours') < 0) {
            if((!this.events.includes(element))&&(element.stat !="finished"))
            this.events.push(element)    
          
            }          }
       
          }
          this.events.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.date).valueOf() - new Date(b.date).valueOf();
          });
       
        });  
    })
  }


finishlivestream(event :event)
{
  event.stat = 'finished'
  this.eventservice.update(event).subscribe(data => {    
  })
}

  lunchstream(event : event)
  {

    this.streamservice.createlive().subscribe(data => {
      console.log(data);
      
    event.stream_id = data.stream_key ;
    event.assests_id = data.id
    data.playback_ids.forEach(element => {
      event.playback_id = element.id ;  
    });
    event.stat = 'en cours'
    event.image = event.image.split("/", 5)[4]
    console.log(event.image);
    
    this.eventservice.update(event).subscribe(data => { 
      location.reload()    

    })
    })    
    this.boolean = true ;

  }
 public finished(event : event )
 {
   event.stat = 'finished'
   event.image = event.image.split("/", 5)[4]
  this.eventservice.update(event).subscribe(data => {
    location.reload()    
  })
 }
  public filterbydate()
{
  var date = new Date()
  this.events =  this.events.filter((item: any) =>
     
    new Date( item.date).getDate() == new Date( date).getDate()
   
)
 
}

}
