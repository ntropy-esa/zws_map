/* global L */

// A layer control which provides for layer groupings.
// Author: Ishmael Smyrnow
L.Control.GroupedLayers = L.Control.extend({

  options: {
    collapsed: true,
    position: 'topright',
    autoZIndex: true,
    exclusiveGroups: []
  },

  initialize: function (baseLayers, groupedOverlays, options) {
    var i, j;
    L.Util.setOptions(this, options);

    this._layers = [];
    this._lastZIndex = 0;
    this._handlingClick = false;
    this._groupList = [];
    this._domGroups = [];

    for (i in baseLayers) {
      this._addLayer(baseLayers[i], i);
    }

    for (i in groupedOverlays) {
      for (j in groupedOverlays[i]) {
        this._addLayer(groupedOverlays[i][j], j, i, true);
      }
    }
  },

  onAdd: function (map) {
    this._initLayout();
    this._update();

    map
        .on('layeradd', this._onLayerChange, this)
        .on('layerremove', this._onLayerChange, this);

    return this._container;
  },

 addTo: function (map) {
    L.Control.prototype.addTo.call(this, map);
    // Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
    return this._expandIfNotCollapsed();
  },

  onRemove: function (map) {
    map
        .off('layeradd', this._onLayerChange, this)
        .off('layerremove', this._onLayerChange, this);
  },

  addBaseLayer: function (layer, name) {
    this._addLayer(layer, name);
    this._update();
    return this;
  },

  addOverlay: function (layer, name, group) {
    this._addLayer(layer, name, group, true);
    this._update();
    return this;
  },

  removeLayer: function (layer) {
    var id = L.Util.stamp(layer);
    var _layer = this._getLayer(id);
    if (_layer) {
      this._layers.splice(this._layers.indexOf(_layer), 1);
    }
    this._update();
    return this;
  },

  _getLayer: function (id) {
    for (var i = 0; i < this._layers.length; i++) {
      if (this._layers[i] && L.stamp(this._layers[i].layer) === id) {
        return this._layers[i];
      }
    }
  },

  _initLayout: function () {
    var className = 'leaflet-control-layers',
      container = this._container = L.DomUtil.create('div', className),
      collapsed = this.options.collapsed;

    // Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
    container.setAttribute('aria-haspopup', true);

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    var form = this._form = L.DomUtil.create('form', className + '-list');

    if (collapsed) {
      this._map.on('click', this._collapse, this);
      if (!L.Browser.android) {
        L.DomEvent.on(container, {
          mouseenter: this._expand,
          mouseleave: this._collapse
        }, this);
      }
    }

          var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
    link.href = '#';
    link.title = 'Layers';
    if (L.Browser.touch) {
      L.DomEvent.on(link, 'click', L.DomEvent.stop);
      L.DomEvent.on(link, 'click', this._expand, this);
    } else {
      L.DomEvent.on(link, 'focus', this._expand, this);
    }
    if (!collapsed) {
      this._expand();
    }

    this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
    this._separator = L.DomUtil.create('div', className + '-separator', form);
    this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

    container.appendChild(form);
  },

  _addLayer: function (layer, name, group, overlay) {
    var id = L.Util.stamp(layer);

    var _layer = {
      layer: layer,
      name: name,
      overlay: overlay
    };
    this._layers.push(_layer);

    group = group || '';
    var groupId = this._indexOf(this._groupList, group);

    if (groupId === -1) {
      groupId = this._groupList.push(group) - 1;
    }

    var exclusive = (this._indexOf(this.options.exclusiveGroups, group) !== -1);

    _layer.group = {
      name: group,
      id: groupId,
      exclusive: exclusive
    };

    if (this.options.autoZIndex && layer.setZIndex) {
      this._lastZIndex++;
      layer.setZIndex(this._lastZIndex);
    }

    this._expandIfNotCollapsed();
  },

  _update: function () {
    if (!this._container) {
      return;
    }

    this._baseLayersList.innerHTML = '';
    this._overlaysList.innerHTML = '';
    this._domGroups.length = 0;

    var baseLayersPresent = false,
      overlaysPresent = false,
      i, obj;

    for (var i = 0; i < this._layers.length; i++) {
      obj = this._layers[i];
      this._addItem(obj);
      overlaysPresent = overlaysPresent || obj.overlay;
      baseLayersPresent = baseLayersPresent || !obj.overlay;
    }

    this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
  },

  _onLayerChange: function (e) {
    var obj = this._getLayer(L.Util.stamp(e.layer)),
      type;

    if (!obj) {
      return;
    }

    if (!this._handlingClick) {
      this._update();
    }

    if (obj.overlay) {
      type = e.type === 'layeradd' ? 'overlayadd' : 'overlayremove';
    } else {
      type = e.type === 'layeradd' ? 'baselayerchange' : null;
    }

    if (type) {
      this._map.fire(type, obj);
    }
  },

  _addItem: function (obj) {
    var label = document.createElement('label'),
      input,
      checked = this._map.hasLayer(obj.layer),
      container,
      groupRadioName;

    input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'leaflet-control-layers-selector';
    input.defaultChecked = checked;

    input.layerId = L.Util.stamp(obj.layer);
    input.groupID = obj.group.id;
    L.DomEvent.on(input, 'click', this._onInputClick, this);

    var name = document.createElement('span');
    name.innerHTML = ' ' + obj.name;

    label.appendChild(input);
    label.appendChild(name);

    if (obj.overlay) {
      container = this._overlaysList;

      var groupContainer = this._domGroups[obj.group.id];

      // Create the group container if it doesn't exist
      if (!groupContainer) {
        groupContainer = document.createElement('div');
        groupContainer.className = 'leaflet-control-layers-group';
        groupContainer.id = 'leaflet-control-layers-group-' + obj.group.id;

        var groupLabel = document.createElement('label');
        groupLabel.className = 'leaflet-control-layers-group-label';

        if (obj.group.name !== '' && !obj.group.exclusive) {
          // ------ add a group checkbox with an _onInputClickGroup function
            var groupInput = document.createElement('input');
            groupInput.type = 'checkbox';
            groupInput.className = 'leaflet-control-layers-group-selector';
            groupInput.groupID = obj.group.id;
            groupInput.legend = this;
            L.DomEvent.on(groupInput, 'click', this._onGroupInputClick, groupInput);
            groupLabel.appendChild(groupInput);
        }

        var groupName = document.createElement('span');
        groupName.className = 'leaflet-control-layers-group-name';
        groupName.innerHTML = obj.group.name;
        groupLabel.appendChild(groupName);

        groupContainer.appendChild(groupLabel);
        container.appendChild(groupContainer);

        this._domGroups[obj.group.id] = groupContainer;
      }

      container = groupContainer;
    } else {
      container = this._baseLayersList;
    }

    container.appendChild(label);

    return label;
  },

  _onGroupInputClick: function () {
    var i, input, obj;

    var this_legend = this.legend;
    this_legend._handlingClick = true;

    var inputs = this_legend._form.getElementsByTagName('input');
    var inputsLen = inputs.length;

    for (i = 0; i < inputsLen; i++) {
      input = inputs[i];
      if (input.groupID === this.groupID && input.className === 'leaflet-control-layers-selector') {
        input.checked = this.checked;
        obj = this_legend._getLayer(input.layerId);
        if (input.checked && !this_legend._map.hasLayer(obj.layer)) {
          this_legend._map.addLayer(obj.layer);
        } else if (!input.checked && this_legend._map.hasLayer(obj.layer)) {
          this_legend._map.removeLayer(obj.layer);
        }
      }
    }

    this_legend._handlingClick = false;
  },

  _onInputClick: function () {
    var i, input, obj,
      inputs = this._form.getElementsByTagName('input'),
      inputsLen = inputs.length;

    this._handlingClick = true;

    for (i = 0; i < inputsLen; i++) {
      input = inputs[i];
      if (input.className === 'leaflet-control-layers-selector') {
        obj = this._getLayer(input.layerId);

        if (input.checked && !this._map.hasLayer(obj.layer)) {
          this._map.addLayer(obj.layer);
        } else if (!input.checked && this._map.hasLayer(obj.layer)) {
          this._map.removeLayer(obj.layer);
        }
      }
    }

    this._handlingClick = false;
  },

  _expand: function () {
    L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
    this._form.style.height = null;
    var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
    if (acceptableHeight < this._form.clientHeight) {
      L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
      this._form.style.height = acceptableHeight + 'px';
    } else {
      L.DomUtil.removeClass(this._form, 'leaflet-control-layers-scrollbar');
    }
    // this._checkDisabledLayers();
    return this;
  },
  _expandIfNotCollapsed: function () {
    if (this._map && !this.options.collapsed) {
      this._expand();
    }
    return this;
  },

  _collapse: function () {
    this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
  },

  _indexOf: function (arr, obj) {
    for (var i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === obj) {
        return i;
      }
    }
    return -1;
  }
});

L.control.groupedLayers = function (baseLayers, groupedOverlays, options) {
  return new L.Control.GroupedLayers(baseLayers, groupedOverlays, options);
};
