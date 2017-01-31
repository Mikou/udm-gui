import { List } from 'immutable';
import { Bundle } from './bundle.model';

export class DecisionSpace {
    id: number;
    title: string;
    description: string;
    published: boolean;
    created_date: Date;
    author: Number;
    bundles: List<Bundle>
}