"use strict";
var core_1 = require('@angular/core');
var make_draggable_directive_1 = require('./make-draggable.directive');
var make_droppable_directive_1 = require('./make-droppable.directive');
var DraggableModule = (function () {
    function DraggableModule() {
    }
    DraggableModule = __decorate([
        core_1.NgModule({
            declarations: [make_draggable_directive_1.MakeDraggable, make_droppable_directive_1.MakeDroppable],
            exports: [make_draggable_directive_1.MakeDraggable, make_droppable_directive_1.MakeDroppable]
        }), 
        __metadata('design:paramtypes', [])
    ], DraggableModule);
    return DraggableModule;
}());
exports.DraggableModule = DraggableModule;
//# sourceMappingURL=draggable.module.js.map