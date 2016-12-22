"use strict";
var core_1 = require('@angular/core');
var FeaturelistitemComponent = (function () {
    function FeaturelistitemComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FeaturelistitemComponent.prototype, "item", void 0);
    FeaturelistitemComponent = __decorate([
        core_1.Component({
            selector: 'ud2d-featurelistitem',
            template: "\n    <p [makeDraggable]=\"item\"><li>{{item.name}}</li></p>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FeaturelistitemComponent);
    return FeaturelistitemComponent;
}());
exports.FeaturelistitemComponent = FeaturelistitemComponent;
//# sourceMappingURL=featurelistitem.component.js.map