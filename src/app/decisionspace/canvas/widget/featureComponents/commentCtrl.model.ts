import { FeatureCtrl } from './../featureCtrl.model';

export class FeatureCrtl_Comment implements FeatureCtrl {
    id:number;
    type:string;
    name:string;
    cptType:string;
    config:any;
    onDeploy:Function
}