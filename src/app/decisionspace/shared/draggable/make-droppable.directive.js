"use strict";
var core_1 = require('@angular/core');
var MakeDroppable = (function () {
    function MakeDroppable(_elementRef) {
        this._elementRef = _elementRef;
        this.dropped = new core_1.EventEmitter();
    }
    MakeDroppable.prototype.ngOnInit = function () {
        var _this = this;
        var el = this._elementRef.nativeElement;
        // Add a style to indicate that this element is a drop target
        el.addEventListener('dragenter', function (e) {
            el.classList.add('over');
        });
        // Remove the style
        el.addEventListener('dragleave', function (e) {
            el.classList.remove('over');
        });
        el.addEventListener('dragover', function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        });
        // On drop, get the data and convert it back to a JSON object
        // and fire off an event passing the data
        el.addEventListener('drop', function (e) {
            if (e.stopPropagation) {
                e.stopPropagation(); // Stops some browsers from redirecting.
            }
            el.classList.remove('over');
            var data = JSON.parse(e.dataTransfer.getData('text'));
            /*let data = {
              data: src,
              position: {
                left:e.clientX,
                top:e.clientY
              }
            }*/
            _this.dropped.emit(data);
            return false;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MakeDroppable.prototype, "dropped", void 0);
    MakeDroppable = __decorate([
        core_1.Directive({
            selector: '[makeDroppable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MakeDroppable);
    return MakeDroppable;
}());
exports.MakeDroppable = MakeDroppable;
//# sourceMappingURL=make-droppable.directive.js.map