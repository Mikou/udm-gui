"use strict";
var core_1 = require('@angular/core');
var MakeDraggable = (function () {
    function MakeDraggable(_elementRef) {
        this._elementRef = _elementRef;
    }
    MakeDraggable.prototype.ngOnInit = function () {
        var _this = this;
        // Get the current element
        var el = this._elementRef.nativeElement.querySelector('li');
        // Set the draggable attribute to the element
        el.draggable = 'true';
        // Set up the dragstart event and add the drag-src CSS class 
        // to change the visual appearance. Set the current todo as the data
        // payload by stringifying the object first
        el.addEventListener('dragstart', function (e) {
            el.classList.add('drag-src');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text', JSON.stringify(_this.data));
        });
        // Remove the drag-src class
        el.addEventListener('dragend', function (e) {
            e.preventDefault();
            el.classList.remove('drag-src');
        });
    };
    __decorate([
        core_1.Input('makeDraggable'), 
        __metadata('design:type', Object)
    ], MakeDraggable.prototype, "data", void 0);
    MakeDraggable = __decorate([
        core_1.Directive({
            selector: '[makeDraggable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MakeDraggable);
    return MakeDraggable;
}());
exports.MakeDraggable = MakeDraggable;
//# sourceMappingURL=make-draggable.directive.js.map