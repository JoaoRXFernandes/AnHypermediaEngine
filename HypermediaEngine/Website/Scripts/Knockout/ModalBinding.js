﻿ko.bindingHandlers.modal = {
    init: function(element, valueAccessor) {
        $(element).modal({
            show: false
        });

        var value = valueAccessor();
        if (ko.isObservable(value)) {
            $(element).on('hide.bs.modal', function() {
                value(false);
            });
        }
        
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        });
    },
    update: function(element, valueAccessor) {
        var value = valueAccessor();
        if (ko.utils.unwrapObservable(value)) {
            $(element).modal('show');
        } else {
            $(element).modal('hide');
        }
    }
};