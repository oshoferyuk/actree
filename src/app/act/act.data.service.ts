import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs/index";
import {take} from "rxjs/internal/operators";
import {ACT_ITEMS, CONDITION_POSITION} from "../ActItem.constant";

@Injectable()
export class ActDataService {

  private actData: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor() {

    const nodes = [
      {
        id: 111,
        isExpanded: true,
        type: ACT_ITEMS.CONDITION,
        conditionPosition: CONDITION_POSITION.START,
        name: [{pre:'IF', condition: 'If the user is located under the \'10k users (aurora.softerra.llc)\' container', post: 'THEN'}],
        children: [
          { id: 2, name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
          { id: 3, name: 'Create the \'\\%username%\' home directory for the user and map it to \'Z:\' drive', type: ACT_ITEMS.ACTION }
        ]
      },
      {
        id: 112,
        isExpanded: true,
        type: ACT_ITEMS.CONDITION,
        conditionPosition: CONDITION_POSITION.END,
        name: [{pre:'ELSE IF', condition: 'the user is a member of the \'.TEST  group', post: 'AND'},
          {pre:'', condition: 'the user is a member of the \'.B  group', post: 'AND'},
          {pre:'', condition: 'the user is a member of the \'.C  group', post: 'THEN'}],
        children: [
          { id: 5, name: "'Activate an Office 365 account for the user: set Location to \'%c%\'", type: ACT_ITEMS.ACTION },
          { id: 51, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
          {
            id: 6,
            isExpanded: true,
            type: ACT_ITEMS.CONDITION,
            conditionPosition: CONDITION_POSITION.THEONE,
            name: [{pre:'IF', condition: 'inner condition l2', post: 'THEN'}],
            children: [
              { id: 61, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
              { id: 62, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
              { id: 63, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
              {
                id: 63995999,
                isExpanded: true,
                type: ACT_ITEMS.CONDITION,
                conditionPosition: CONDITION_POSITION.START,
                name: [{pre:'IF', condition: 'inner condition l3', post: 'THEN'}],
                children: [
                  { id: 6731, name: 'Add the user to the \'.TEST (aurora.softerra.llc\\Offices)\' group', type: ACT_ITEMS.ACTION },
                  { id: 6732, name: 'Add the user to the \'.TEST (aurora.softerra.llc\\Offices)\' group', type: ACT_ITEMS.ACTION },
                  { id: 6733, name: 'Add the user to the \'.TEST (aurora.softerra.llc\\Offices)\' group', type: ACT_ITEMS.ACTION }
                ]
              },
              {
                id: 6399992,
                isExpanded: true,
                type: ACT_ITEMS.CONDITION,
                conditionPosition: CONDITION_POSITION.MIDDLE,
                name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'THEN'}],
                children: [
                  { id: 531, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                  { id: 532, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                  {
                    id: 76399992,
                    isExpanded: true,
                    type: ACT_ITEMS.CONDITION,
                    conditionPosition: CONDITION_POSITION.START,
                    name: [{pre:'IF', condition: 'inner condition l4(1)', post: 'THEN'}],
                    children: [
                      { id: 7534, name: 'Activate an Office 365 account for the user A', type: ACT_ITEMS.ACTION },
                      { id: 7535, name: 'Activate an Office 365 account for the user B', type: ACT_ITEMS.ACTION },
                      { id: 7536, name: 'Activate an Office 365 account for the user C', type: ACT_ITEMS.ACTION },
                    ]
                  },
                  {
                    id: 7399992,
                    isExpanded: true,
                    type: ACT_ITEMS.CONDITION,
                    conditionPosition: CONDITION_POSITION.END,
                    name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                    children: [
                      { id: 7537, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      { id: 7538, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      { id: 7539, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION }
                    ]
                  },
                  { id: 533, name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                ]
              },
              {
                id: 6399993,
                isExpanded: true,
                type: ACT_ITEMS.CONDITION,
                conditionPosition: CONDITION_POSITION.MIDDLE,
                name: [{pre:'IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                children: [
                  { id: 534, name: 'Archive the home directory of the user A', type: ACT_ITEMS.ACTION },
                  { id: 535, name: 'Archive the home directory of the user B', type: ACT_ITEMS.ACTION },
                  { id: 536, name: 'Archive the home directory of the user C', type: ACT_ITEMS.ACTION },
                ]
              },
              {
                id: 6399995,
                isExpanded: true,
                type: ACT_ITEMS.CONDITION,
                conditionPosition: CONDITION_POSITION.END,
                name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'THEN'}],
                children: [
                  { id: 537, name: 'Archive the home directory of the user D', type: ACT_ITEMS.ACTION },
                  { id: 538, name: 'Archive the home directory of the user E', type: ACT_ITEMS.ACTION },
                  { id: 539, name: 'Archive the home directory of the user F', type: ACT_ITEMS.ACTION },
                  { id: 530, name: 'Archive the home directory of the user E', type: ACT_ITEMS.ACTION }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 113,
        isExpanded: true,
        type: ACT_ITEMS.CONDITION,
        conditionPosition: CONDITION_POSITION.THEONE,
        name: [{pre:'IF', condition: 'super condition', post: 'THEN'}],
        children: [
          { id: 266625, name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
          { id: 37364, name: 'action 2', type: ACT_ITEMS.ACTION }
        ]
      },
    ];






      nodes.push({
          id: this.random(),
          isExpanded: true,
          type: ACT_ITEMS.CONDITION,
          conditionPosition: CONDITION_POSITION.THEONE,
          name: [{pre:'IF' + 3, condition: 'If the user is located under the \'10k users (aurora.softerra.llc)\' container', post: 'THEN'}],
          children: [
            { id: this.random(), name: "Share the home directory of the user as \'%username%\'", type: ACT_ITEMS.ACTION },
            { id: this.random(), name: 'Create the \'\\%username%\' home directory for the user and map it to \'Z:\' drive', type: ACT_ITEMS.ACTION },
            {
              id: this.random(),
              isExpanded: true,
              type: ACT_ITEMS.CONDITION,
              conditionPosition: CONDITION_POSITION.THEONE,
              name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
              children: [
                { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                {
                  id: this.random(),
                  isExpanded: true,
                  type: ACT_ITEMS.CONDITION,
                  conditionPosition: CONDITION_POSITION.THEONE,
                  name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                  children: [
                    { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                    { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                    { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                    {
                      id: this.random(),
                      isExpanded: true,
                      type: ACT_ITEMS.CONDITION,
                      conditionPosition: CONDITION_POSITION.THEONE,
                      name: [{pre:'ELSE IF', condition: 'inner condition l3(2)', post: 'ELSE'}],
                      children: [
                        { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                        { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                        { id: this.random(), name: 'Cancel all meetings organized by the user', type: ACT_ITEMS.ACTION },
                      ]
                    }
                  ]
                }
              ]
            },
          ]
        }
      );



    this.setState(nodes);
  }


  random(){
    return Math.floor((Math.random() * 100000) + 1);
  }


  setState(data: any) {
    this.actData.next(data);
  }

  select(selector?: any): Observable<any> {
    return this.actData.asObservable();
  }
  pipe()
  {
    return this.actData.pipe()
  }
  dispatch(data:any) {
    this.actData.next(data)
  }
  getState()
  {
    return this.actData.pipe(take(1))
  }
}
