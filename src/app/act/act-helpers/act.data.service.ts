import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs/index';

import { conditionPosition, nodeType } from './act.data.constant';
import { IActData } from './act.data.model';

// tslint:disable:quotemark
@Injectable()
export class ActDataService
{
    private actData: BehaviorSubject<IActData> = new BehaviorSubject(undefined);

    constructor()
    {
        const bogusNodes = [
            {
                id: 111,
                isExpanded: true,
                type: true,
                conditionPosition: conditionPosition.start,
                name: [
                    {
                        pre: 'If',
                        condition:
                            "the user is located under the '10k users (aurora.softerra.llc)' container",
                        post: 'then'
                    }
                ],
                children: [
                    {
                        id: 2,
                        name: "Share the home directory of the user as '%username%'",
                        type: false
                    },
                    {
                        id: 3,
                        name:
                            "Create the '\\%username%' home directory for the user and map it to 'Z:' drive",
                        type: false
                    }
                ]
            },
            {
                id: 112,
                isExpanded: true,
                type: true,
                conditionPosition: conditionPosition.end,
                name: [
                    {
                        pre: 'else If',
                        condition: "the user is a member of the '.TEST  group",
                        post: 'AND'
                    },
                    { pre: '', condition: "the user is a member of the '.B  group", post: 'AND' },
                    { pre: '', condition: "the user is a member of the '.C  group", post: 'then' }
                ],
                children: [
                    {
                        id: 5,
                        name: "'Activate an Office 365 account for the user: set Location to '%c%'",
                        type: false
                    },
                    {
                        id: 51,
                        name: 'Cancel all meetings organized by the user',
                        type: false
                    },
                    {
                        id: 6,
                        isExpanded: true,
                        type: true,
                        conditionPosition: conditionPosition.one,
                        name: [{ pre: 'If', condition: 'inner condition l2 6', post: 'then' }],
                        children: [
                            {
                                id: 61,
                                name: 'Cancel all meetings organized by the user 61',
                                type: false
                            },
                            {
                                id: 62,
                                name: 'Cancel all meetings organized by the user 62',
                                type: false
                            },
                            {
                                id: 63,
                                name: 'Cancel all meetings organized by the user 63',
                                type: false
                            },
                            {
                                id: 63995999,
                                isExpanded: true,
                                type: true,
                                conditionPosition: conditionPosition.start,
                                name: [
                                    { pre: 'If', condition: 'inner condition l3 63995999', post: 'then' }
                                ],
                                children: [
                                    {
                                        id: 6731,
                                        name:
                                            "Add the user to the '.TEST (aurora.softerra.llc\\Offices)' group 6731",
                                        type: false
                                    },
                                    {
                                        id: 6732,
                                        name:
                                            "Add the user to the '.TEST (aurora.softerra.llc\\Offices)' group 6732",
                                        type: false
                                    },
                                    {
                                        id: 6733,
                                        name:
                                            "Add the user to the '.TEST (aurora.softerra.llc\\Offices)' group 6733",
                                        type: false
                                    }
                                ]
                            },
                            {
                                id: 6399992,
                                isExpanded: true,
                                type: true,
                                conditionPosition: conditionPosition.middle,
                                name: [
                                    {
                                        pre: 'else If',
                                        condition: 'inner condition l3(2) 6399992',
                                        post: 'then'
                                    }
                                ],
                                children: [
                                    {
                                        id: 531,
                                        name: 'Cancel all meetings organized by the user 531',
                                        type: false
                                    },
                                    {
                                        id: 532,
                                        name: 'Cancel all meetings organized by the user',
                                        type: false
                                    },
                                    {
                                        id: 76399992,
                                        isExpanded: true,
                                        type: true,
                                        conditionPosition: conditionPosition.start,
                                        name: [
                                            {
                                                pre: 'If',
                                                condition: 'inner condition l4(1) 76399992',
                                                post: 'AND'
                                            },
                                            {
                                                pre: 'If',
                                                condition: 'inner condition l42(1)',
                                                post: 'then'
                                            }
                                        ],
                                        children: [
                                            {
                                                id: 7534,
                                                name:
                                                    'Activate an Office 365 account for the user A 7534',
                                                type: false
                                            },
                                            {
                                                id: 7535,
                                                name:
                                                    'Activate an Office 365 account for the user B 7535',
                                                type: false
                                            },
                                            {
                                                id: 7536,
                                                name:
                                                    'Activate an Office 365 account for the user C 7536',
                                                type: false
                                            }
                                        ]
                                    },
                                    {
                                        id: 7399992,
                                        isExpanded: true,
                                        type: true,
                                        conditionPosition: conditionPosition.end,
                                        name: [
                                            {
                                                pre: 'else If',
                                                condition: 'inner condition l3(2)',
                                                post: 'else'
                                            }
                                        ],
                                        children: [
                                            {
                                                id: 7537,
                                                name: 'Cancel all meetings organized by the user',
                                                type: false
                                            },
                                            {
                                                id: 7538,
                                                name: 'Cancel all meetings organized by the user',
                                                type: false
                                            },
                                            {
                                                id: 7539,
                                                name: 'Cancel all meetings organized by the user',
                                                type: false
                                            }
                                        ]
                                    },
                                    {
                                        id: 533,
                                        name: 'Cancel all meetings organized by the user',
                                        type: false
                                    }
                                ]
                            },
                            {
                                id: 6399993,
                                isExpanded: true,
                                type: true,
                                conditionPosition: conditionPosition.middle,
                                name: [
                                    { pre: 'If', condition: 'inner condition l3(2)', post: 'else' }
                                ],
                                children: [
                                    {
                                        id: 534,
                                        name: 'Archive the home directory of the user A',
                                        type: false
                                    },
                                    {
                                        id: 535,
                                        name: 'Archive the home directory of the user B',
                                        type: false
                                    },
                                    {
                                        id: 536,
                                        name: 'Archive the home directory of the user C',
                                        type: false
                                    }
                                ]
                            },
                            {
                                id: 6399995,
                                isExpanded: true,
                                type: true,
                                conditionPosition: conditionPosition.end,
                                name: [
                                    {
                                        pre: 'else If',
                                        condition: 'inner condition l3(2)',
                                        post: 'then'
                                    }
                                ],
                                children: [
                                    {
                                        id: 537,
                                        name: 'Archive the home directory of the user D',
                                        type: false
                                    },
                                    {
                                        id: 538,
                                        name: 'Archive the home directory of the user E',
                                        type: false
                                    },
                                    {
                                        id: 539,
                                        name: 'Archive the home directory of the user F',
                                        type: false
                                    },
                                    {
                                        id: 530,
                                        name: 'Archive the home directory of the user E',
                                        type: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 113,
                isExpanded: true,
                type: true,
                conditionPosition: conditionPosition.one,
                name: [{ pre: 'If', condition: 'super condition', post: 'then' }],
                children: [
                    {
                        id: 266625,
                        name: "Share the home directory of the user as '%username%'",
                        type: false
                    },
                    { id: 37364, name: 'action 2', type: false }
                ]
            }
        ];

        for (let i = 0; i < 10; i++) {
            bogusNodes.push({
                id: this.random(),
                isExpanded: true,
                type: true,
                conditionPosition: conditionPosition.one,
                name: [
                    {
                        pre: 'If' + 3,
                        condition:
                            "the user is located under the '10k users (aurora.softerra.llc)' container",
                        post: 'then'
                    }
                ],
                children: [
                    {
                        id: this.random(),
                        name: "Share the home directory of the user as '%username%'",
                        type: false
                    },
                    {
                        id: this.random(),
                        name:
                            "Create the '\\%username%' home directory for the user and map it to 'Z:' drive",
                        type: false
                    },
                    {
                        id: this.random(),
                        isExpanded: true,
                        type: true,
                        conditionPosition: conditionPosition.one,
                        name: [{pre: 'else If', condition: 'inner condition l3(2)', post: 'else'}],
                        children: [
                            {
                                id: this.random(),
                                name: 'Cancel all meetings organized by the user',
                                type: false
                            },
                            {
                                id: this.random(),
                                name: 'Cancel all meetings organized by the user',
                                type: false
                            },
                            {
                                id: this.random(),
                                name: 'Cancel all meetings organized by the user',
                                type: false
                            },
                            {
                                id: this.random(),
                                isExpanded: true,
                                type: true,
                                conditionPosition: conditionPosition.one,
                                name: [
                                    {pre: 'else If', condition: 'inner condition l3(2)', post: 'else'}
                                ],
                                children: [
                                    {
                                        id: this.random(),
                                        name: 'Cancel all meetings organized by the user',
                                        type: false
                                    },
                                    {
                                        id: this.random(),
                                        name: 'Cancel all meetings organized by the user',
                                        type: false
                                    },
                                    {
                                        id: this.random(),
                                        name: 'Cancel all meetings organized by the user',
                                        type: false
                                    },
                                    {
                                        id: this.random(),
                                        isExpanded: true,
                                        type: true,
                                        conditionPosition: conditionPosition.one,
                                        name: [
                                            {
                                                pre: 'else If',
                                                condition: 'inner condition l3(2)',
                                                post: 'else'
                                            }
                                        ],
                                        children: [
                                            {
                                                id: this.random(),
                                                name: 'Cancel all meetings organized by the user',
                                                type: false
                                            },
                                            {
                                                id: this.random(),
                                                name: 'Cancel all meetings organized by the user',
                                                type: false
                                            },
                                            {
                                                id: this.random(),
                                                name: 'Cancel all meetings organized by the user',
                                                type: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        }

        this.setState(bogusNodes);
    }

    setState(data: any)
    {
        this.actData.next(data);
    }

    select(): Observable<any>
    {
        return this.actData.asObservable();
    }

    // temporal for unique ids
    random()
    {
        return Math.floor(Math.random() * 100000 + 1);
    }
}
