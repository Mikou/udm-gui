"use strict";
var core_1 = require('@angular/core');
var FeaturelistComponent = (function () {
    function FeaturelistComponent() {
        this.title = 'feature browser';
        this.featureitems = [
            { id: 0, type: "featureItem", name: "comment", cptType: "comment", config: {
                    topicField: "WRITE A TOPIC"
                } },
            { id: 1, type: "featureItem", name: "comments archive", cptType: "commentarchive", config: {} },
        ];
    }
    FeaturelistComponent = __decorate([
        core_1.Component({
            selector: 'ud2d-featurelist',
            template: "\n    <h3>{{title}}</h3>\n    <ud2d-featurelistitem \n      *ngFor=\"let featureitem of featureitems\" \n      [item]=\"featureitem\"\n    >\n    </ud2d-featurelistitem>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FeaturelistComponent);
    return FeaturelistComponent;
}());
exports.FeaturelistComponent = FeaturelistComponent;
//# sourceMappingURL=featurelist.component.js.map