"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var draggable_module_1 = require('../../shared/draggable/draggable.module');
/* APP root */
var featurelist_component_1 = require('./featurelist.component');
var featurelistitem_component_1 = require('./featurelistitem.component');
/* Feature module */
var FeaturelistModule = (function () {
    function FeaturelistModule() {
    }
    FeaturelistModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, draggable_module_1.DraggableModule],
            declarations: [featurelist_component_1.FeaturelistComponent, featurelistitem_component_1.FeaturelistitemComponent],
            exports: [featurelist_component_1.FeaturelistComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], FeaturelistModule);
    return FeaturelistModule;
}());
exports.FeaturelistModule = FeaturelistModule;
//# sourceMappingURL=featurelist.module.js.map