import {Visualization} from './visualization.model';
import {Feature} from './feature.model';

import {List} from 'immutable';

export class Bundle {

    constructor() {
        this.published = true;
    }

    title: string;
    description: string;
    published: boolean;
    author: number;
    gravity: number;
    visualization: Visualization;
    features: List<Feature>;
}