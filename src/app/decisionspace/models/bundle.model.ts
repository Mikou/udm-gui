import {List} from 'immutable';
import {Visualization} from './visualization.model';
import {Feature} from './feature.model';

export class Bundle {
    id: number;
    title: string;
    description: string;
    published: boolean;
    created_date: Date;
    visualization: Visualization;
    features: List<Feature>;
    author: number;
}