import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match1} from '../../../../interfaces/match1';
import {CUP_INTERVAL} from '../../../../constants/general';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-cup-table',
  templateUrl: './cup-table.component.html',
  styleUrls: ['./cup-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CupTableComponent implements OnInit {

  @Input() cupSchedule: Match1[][];

  // cupTreeNode: TreeNode[];
  // data2;

  constructor() {
  }

  ngOnInit(): void {
    /*console.log('cupSchedule', this.cupSchedule);
    this.data2 = [{     // 0
      label: 'F.C Barcelona',
      expanded: true,
      children: [
        {   // 0
          label: 'F.C Barcelona',
          expanded: true,
          children: [
            {     // 0
              label: 'Chelsea FC',
              children: [
                {},   // 0
                {},   // 1
                {},   // 2
                {}    // 3
              ]
            },
            {     // 1
              label: 'F.C. Barcelona',
              children: [
                {},   // 0
                {},   // 1
                {},   // 2
                {}    // 3
              ]
            }
          ]
        },
        {     // 1
          label: 'Real Madrid',
          expanded: true,
          children: [
            {     // 0
              label: 'Bayern Munich',
              children: [
                {},   // 0
                {},   // 1
                {},   // 2
                {}    // 3
              ]
            },
            {     // 1
              label: 'Real Madrid',
              children: [
                {},   // 0
                {},   // 1
                {},   // 2
                {}    // 3
              ]
            }
          ]
        }
      ]
    }];
    this.cupTreeNode = [];
    this.cupTreeNode = this.cupSchedule.reduceRight((prevValue, curValue: Match1[], index) => {
      console.warn('reduceRight START');
      console.log('reduceRight prevValue', prevValue);
      console.log('reduceRight curValue', curValue);
      console.log('reduceRight index', index);
      const objArr = curValue.map((match: Match1) => {
        return {
          label: `Match ${match.id}`,
          expanded: true,
          data: match,
          type: 'match'
        };
      });
      console.log('objArr', objArr);

      // let parents: TreeNode[];
      if (index === this.cupSchedule.length - 1) {
        // 0
        // parents = prevValue;
        prevValue = objArr;
        console.log('index === 0', prevValue);
      } else {
        let start = 0;
        const childrenCheck = (arr) => {
          console.log('childrenCheck for ', arr.map(v => v.label));
          let a = 0;
          arr.forEach((val, ind) => {
            console.log('arr.forEach', val.label, ind);
            console.log('!val.children', !val.children);
            if (!val.children) {
              console.log('if no children');
              // console.log(`slice: ${a} => ${(ind + 1) * objArr.length / arr.length}`);
              console.log(`slice: ${start} => ${start + 2}`);
              val.children = objArr.slice(start, start + 2);
              console.log('children after slice', val.children.length);
              // a = (ind + 1) * objArr.length / arr.length;
              start = start + 2;
            } else {
              console.log('if there ARE children', val.children.length);
              childrenCheck(val.children);
            }
          });
        };
        childrenCheck(prevValue);
        console.log('else', prevValue);
      }
      console.log('PrevValue RESULT', prevValue);
      /!*if (index === 1) {
        // 00 01
          // 2 ^ (index - 1) = 1
        parents = [...prevValue[0].children];
        prevValue[0].children = objArr.slice(0, objArr.length / 1);
      }
      if (index === 2) {
        // 000 001    010 011
        // 2 ^ (index - 1) = 2
        parents = [...prevValue[0].children[0].children, ...prevValue[0].children[1].children];
        prevValue[0].children[0].children = objArr.slice(0, objArr.length / 2);
        prevValue[0].children[1].children = objArr.slice(objArr.length / 2, objArr.length);
      }
      if (index === 3) {
        // 2 ^ (index - 1) = 4
        // 0000 0001 0002 0003   0010 0011 0012 0013   0100 0101 0102 0103   0110 0111 0112 0113
        parents = [...prevValue[0].children[0].children[0].children, ...prevValue[0].children[0].children[1].children
          , ...prevValue[0].children[0].children[2].children, ...prevValue[0].children[0].children[3].children];
        prevValue[0].children[0].children[0].children = objArr.slice(0, objArr.length / 4);
        prevValue[0].children[0].children[1].children = objArr.slice(objArr.length / 4, 2 * objArr.length / 4);
        prevValue[0].children[0].children[2].children = objArr.slice(2 * objArr.length / 4, 3 * objArr.length / 4);
        prevValue[0].children[0].children[3].children = objArr.slice(3 * objArr.length / 4, 4 * objArr.length / 4);
      }*!/

      return [...prevValue];
    }, this.cupTreeNode);*/
  }

  cupRoundToWeek(round: number): number {
    return round * CUP_INTERVAL + 1;
  }

}
