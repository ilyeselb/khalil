import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core';
import { EventService } from 'src/app/shared/service/event.service';
import { environment } from 'src/environments/environment';
import { event } from 'src/app/shared/data/event';
import { LivestreamService } from 'src/app/shared/service/livestream.service';


@Component({
  selector: 'app-lunchlivestream',
  templateUrl: './lunchlivestream.component.html',
})

export class LunchlivestreamComponent implements OnInit {
public events ;
public boolean ;
  ngOnInit() {
    this.getall() ;
    console.log(this.events , "alalalalalla");
    
}
  constructor(private eventservice : EventService ,private  streamservice : LivestreamService ) {
    this.events = [] ;
    this.boolean = false ;
  }

  getall() {
    this.events = []
    this.eventservice.get().subscribe(data => {
    this.events = data
      this.events.forEach(element => {
      element.image = environment.patheventimage + element.image
      if((element.playback_id !=='')||(element.stream_id!==''))
      {
        this.boolean = true ;
      }
      });
  
  this.filterbydate()

    console.log(this.events);
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
    event.image = event.image.split("/", 5)[4]

    this.streamservice.createlive().subscribe(data => {
    event.stream_id = data.stream_key ;
    event.assests_id = data.id
    data.playback_ids.forEach(element => {
      event.playback_id = element.id ;  
    });
    event.stat = 'en cours'

 
    })
    this.eventservice.update(event).subscribe(data => {
      console.log('resp ',data);
      
    })
  
    event.image = environment.patheventimage + event.image
    
    this.boolean = true ;

  }

  public filterbydate()
{
  var date = new Date()
  this.events =  this.events.filter((item: any) =>
     
    new Date( item.date).getDate() == new Date( date).getDate()
   
)
}

}
