/**
 * Created by freeman on 17-5-26.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Picker from '../picker';

/**
 *  An city pick component build on top of picker
 *
 */
export default class CityPicker extends Component {

  static propTypes = {
    /**
     * Array of item trees, consists property for label and subitems
     *
     */
    data: PropTypes.array.isRequired,
    /**
     * keys for data provide, `id` to indicate property name for label, `items` to indicate property name for subitems
     *
     */
    dataMap: PropTypes.object,
    /**
     * currently selected item
     *
     */
    selected: PropTypes.array,
    /**
     * display the component
     *
     */
    show: PropTypes.bool
  }

  static defaultProps = {
    data: [],
    dataMap: {id: 'name',code:'code',items: 'sub'},
    selected: [],
    show: false
  }

  constructor(props) {
    super(props);
    const {data, selected, dataMap} = this.props;
    const {groups, newselected} = this.parseData(data, dataMap.items, this.parseCodeToIndex(data,dataMap,selected));
    this.state = {
      groups,
      selected: newselected,
      picker_show: false,
      text: '',
      value: '',
    };
    //console.log(this.state.groups)
    this.updateGroup = this.updateGroup.bind(this);
    this.parseData = this.parseData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.parseCodeToIndex = this.parseCodeToIndex.bind(this);
  }

  parseCodeToIndex(data,dataMap,selected){
    const subKey = dataMap.items
    const codeKey = dataMap.code
    let _group = JSON.parse(JSON.stringify(data));
    let indexSelected = []
    _group.map((province,province_index) =>{
      if (province[codeKey] === selected[0]){
        indexSelected.push(province_index);
        province[subKey].map((city,city_index) =>{
          if (city[codeKey] === selected[1]){
            indexSelected.push(city_index);
            if (typeof city[subKey] !== 'undefined' && Array.isArray(city[subKey])){
              city[subKey].map((state,state_index) =>{
                if (state[codeKey] === selected[2]){
                  indexSelected.push(state_index);
                }
              })
            }
          }
        })
      }
    })
    return indexSelected
  }


  //@return array of group with options
  parseData(data, subKey, selected = [], group = [], newselected = []) {
    let _selected = 0;

    if (Array.isArray(selected) && selected.length > 0) {
      let _selectedClone = selected.slice(0);
      _selected = _selectedClone.shift();
      selected = _selectedClone;
    }

    if (typeof data[_selected] === 'undefined') {
      _selected = 0;
    }

    newselected.push(_selected);

    let item = data[_selected];

    let _group = JSON.parse(JSON.stringify(data));
    _group.forEach(g => delete g[subKey]);
    group.push({items: _group, mapKeys: {'label': this.props.dataMap.id}});

    if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
      return this.parseData(item[subKey], subKey, selected, group, newselected);
    } else {
      return {groups: group, newselected};
    }
  }


  updateGroup(item, i, groupIndex, selected, picker) {
    const {data, dataMap} = this.props;
    //validate if item exists

    const {groups, newselected} = this.parseData(data, dataMap.items, selected);

    let text = '';
    let value = '';
    try {
      groups.forEach((group, _i) => {
        text += `${group['items'][selected[_i]][this.props.dataMap.id]} `;
        value += `${group['items'][selected[_i]][this.props.dataMap.code]} `;
      });
    } catch (err) {
      //wait
      text = this.state.text;
      value = this.state.value;
    }


    //console.log(groups)
    this.setState({
      groups,
      text,
      value,
      selected: newselected
    });

    //update picker
    picker.setState({
      selected: newselected
    });
  }

  handleChange() {
    if (this.props.onChange) this.props.onChange(this.state.text,this.state.value);
  }

  render() {
    return (
      <Picker
        show={this.props.show}
        onGroupChange={this.updateGroup}
        onChange={this.handleChange}
        defaultSelect={this.state.selected}
        groups={this.state.groups}
        onCancel={this.props.onCancel}
      />
    );
  }
}
