import { Component, OnInit } from '@angular/core';
import { Topic, SubTopic, chelek, seif, SubSeif, ContentSeifMishna, Question, SearchResult } from '../../model/topic';
import { MIshnaService } from '../../service/mishna.service';
import { PlayerService } from '../../service/player.service';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-berura',
  templateUrl: './berura.component.html',
  styleUrls: ['./berura.component.css'],
  providers: [MIshnaService, PlayerService]
})
export class BeruraComponent implements OnInit {

  loading: string = "Loading..."
  firstTime: boolean = true
  content: ContentSeifMishna
  currentSimanId: number

  relateds: Array<SubSeif> = []
  selectedRelated: SubSeif

  cheleks: Array<chelek> = []
  selectedCheleck: chelek

  seifs: Array<seif> = []
  selectedSeif: seif

  topics: Array<Topic> = []
  selectedTopic: Topic

  subTopics: Array<SubTopic> = []
  selectedSubTopic: SubTopic

  query_main: string = ''
  search: Array<SearchResult> = []
  action: string = 'combo'

  constructor(private playerService: PlayerService, private mishnaService: MIshnaService) { }

  ngOnInit() {
    this.ReadCheleck()
    this.ReadTopic()
  }

  keyDown(event) {
    if (event.keyCode == 13) {
      let self = this
      this.mishnaService.Search(this.query_main).subscribe(function (respond) {

        self.search = respond
        self.action = 'search'
      },
        function (error) { },
        function () { })
    }
  }

  setValue(cont: ContentSeifMishna) {
    this.content = cont
    this.loading = cont.subTopicName
  }

  setValueCombo(cont: ContentSeifMishna) {
    this.content = cont
    this.setByContent()

  }

  Forward() {
    this.mishnaService.navigate(this.content.id, "next").subscribe(
      result => this.setValue(result)
    )
  }

  Back() {
    this.mishnaService.navigate(this.content.id, "prev").subscribe(
      result => result == "There is no previous content." ? this.mishnaService.Notify(result, false) : this.setValue(result)
    )
  }

  ReadCheleck() {
    let self = this;
    this.mishnaService.readChelek().subscribe(
      function (respond) {
        self.cheleks = respond;
        self.selectedCheleck = respond[0]
        self.ReadSeif(respond[0].id)
      },
      function (error) { },
      function () { }
    )

  }

  ReadSeif(idChelek: number) {
    let self = this;
    this.mishnaService.readSeif(idChelek).subscribe(
      function (respond) {
        self.seifs = respond;
        self.selectedSeif = respond[0]
        self.ReadContent(respond[0].id, true)

      },
      function (error) { },
      function () { }
    )

  }

  ReadContent(idSeif: number, combo: boolean) {

    this.action = "combo"
    let self = this;
    this.mishnaService.readContentSeif(idSeif).subscribe(
      function (respond) {
        if (!combo)
          self.setValue(respond);
        else
          self.setValueCombo(respond);
      },
      function (error) { },
      function () { }
    )
  }

  setByContent() {

    this.selectedTopic = this.topics.filter(i => i.id == this.content.topicID)[0]

    let self = this;
    this.ReadSubTopics(this.selectedTopic.id, true)

  }

  getRelated(id: number) {
    return this.relateds.filter(i => i.idFather == id)
  }

  ReadTopic() {
    let self = this;
    this.mishnaService.readTopic().subscribe(
      function (respond) {
        self.topics = respond;
        self.selectedTopic = respond[0]
        self.ReadSubTopics(respond[0].id, true)
      },
      function (error) { },
      function () { }
    )

  }

  ReadSubTopics(idTopic: number, combo: boolean) {
    this.loading = "Loading..."
    this.subTopics = []
    let self = this;
    this.mishnaService.readSubTopic(idTopic).subscribe(
      function (respond) {

        self.ReadBySubTopics(respond, combo)
      },
      function (error) { },
      function () { }
    )

  }

  ReadBySubTopics(subs: Array<SubTopic>, combo: boolean) {
    let self = this;
    self.relateds = []

    var obs: Array<Observable<seif[]>> = []

    for (var i = 0; i < subs.length; i++) {
      obs.push(this.mishnaService.readBySubTopic(subs[i].id))
    }

    Observable.forkJoin(
      obs
    )
      .subscribe(function (response) {

        var i = -1;
        response.forEach(function (r) {

          i++;
          for (var j = 0; j < r.length; j++) {

            self.relateds.push({ id: r[j].id, name: r[j].name, idFather: subs[i].id })
          }

        })
        self.subTopics = subs
        if (!combo) {
          self.selectedSubTopic = subs[0]
          self.selectedRelated = self.relateds[0]
          self.ReadContent(self.selectedRelated.id, false)
        }
        else {
          self.selectedSubTopic = self.subTopics.filter(i => i.id == self.content.subTopicID)[0]
          self.selectedRelated = self.relateds.filter(i => i.id == self.content.id)[0]
        }
        self.loading = self.selectedSubTopic.name


      }, function (error) { }, function () { }
      );

  }

  Play() {
    this.playerService.PlayAudio("", this.content.audio,"")
  }

  Print() {

    this.content.imageUrl.split(',').forEach(function (a) {
      $("body").append("<img src='"+a+"' id='im'/>")
      $('#im').print();
      $('#im').remove();
    })

  }


  //--------------------------------------------------------------------------------------------------------

  ShowQuestion(q: Question) {
    q.status = !q.status
  }

  Hebrew() {
    this.content.imageUrl.split(',').forEach(function (a) {

      window.open(a)
    })
  }

  Read(s: SearchResult) {

    this.currentSimanId = s.simanID
    let self = this;

    this.selectedCheleck = this.cheleks.filter(i => i.id == s.chelekID)[0]

    this.mishnaService.readSeif(s.chelekID).subscribe(
      function (respond) {
        self.seifs = respond;
        self.selectedSeif = respond.filter(i => i.id == s.seifID)[0]

      },
      function (error) { },
      function () { }
    )

    //-----------------------------------------------------------------------------------------------------
    this.selectedTopic = this.topics.filter(i => i.id == s.topicID)[0]

    this.mishnaService.readSubTopic(this.selectedTopic.id).subscribe(
      function (subs) {

        /****************************************************************************************/
        self.loading = "Loading..."
        self.subTopics = []
        self.relateds = []

        var obs: Array<Observable<seif[]>> = []

        for (var i = 0; i < subs.length; i++) {
          obs.push(self.mishnaService.readBySubTopic(subs[i].id))
        }

        Observable.forkJoin(
          obs
        )
          .subscribe(function (response) {

            var i = -1;
            response.forEach(function (r) {

              i++;
              for (var j = 0; j < r.length; j++) {

                self.relateds.push({ id: r[j].id, name: r[j].name, idFather: subs[i].id })
              }

            })
            self.subTopics = subs

            self.selectedSubTopic = self.subTopics.filter(i => i.id == s.subTopicID)[0]
            self.selectedRelated = self.relateds.filter(i => i.id == s.seifID)[0]

            self.loading = self.selectedSubTopic.name


          }, function (error) { }, function () { }
          );
        /****************************************************************************************/

      },
      function (error) { },
      function () { }
    )


    this.mishnaService.readContentSeif(s.seifID).subscribe(
      function (respond) {
        self.content = respond
        self.content.qaList = [{ id: s.questionAndAnswerID, question: s.question, answer: s.answer, status: false }]
        self.action = "comboread"
      },
      function (error) { },
      function () { }
    )

  }


  QA() {

    let self = this;
    this.mishnaService.QuestionAndAnswer(this.currentSimanId).subscribe(
      function (respond) {

        self.content.qaList = []
        respond.forEach(function (a) {

          var q = new Question()
          q.id = a.QuestionAndAnswerID
          q.answer = a.Answer
          q.question = a.Question
          q.status = false

          self.content.qaList.push(q);

        })

        self.action = "comboonly"

      },
      function (error) { },
      function () { }
    )
  }

}
