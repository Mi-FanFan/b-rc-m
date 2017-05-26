/**
 * Created by Freeman on 2017/5/26.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import omit from 'lodash/omit'
export default class PickerGroup extends Component {


  static propTypes = {
    height: PropTypes.number,
    onChange: PropTypes.func,
    animation: PropTypes.bool,
    groupIndex: PropTypes.number,
    defaultIndex: PropTypes.number,
    mapKeys:PropTypes.object,
  }

  static defaultProps = {
    height: 476,
    animation: true,
    groupIndex: -1,
    defaultIndex: -1,
    mapKeys: {
      label: 'label'
    }
  }

  constructor (props) {
    super(props)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.updateSelected = this.updateSelected.bind(this);
    this.state = {
      touching: false,
      ogY: 0,
      ogTranslate: 0,
      touchId: undefined,
      translate: 0,
      totalHeight: 0,
      selected: 0,
      animating: props.animation,
      itemHeight: 50 + 18,//content + padding
      indicatorTop: 204,//content + padding
      indicatorHeight: 68,//content + padding
    };
  }

  componentDidMount(){
    this.adjustPosition(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.adjustPosition(nextProps);
  }

  adjustPosition(props){
    const {items, defaultIndex} = props;
    let itemHeight = this.indicator.offsetHeight
    let indicatorTop = this.indicator.offsetTop
    let indicatorHeight = itemHeight
    const totalHeight = items.length * itemHeight;
    let translate = totalHeight <= indicatorTop ? indicatorTop : 0;

    if (defaultIndex > -1) {
      if (translate === 0){
        let upperCount = Math.floor(indicatorTop / itemHeight);
        if ( defaultIndex > upperCount ){
          //over
          let overCount = defaultIndex - upperCount;
          translate -= overCount * itemHeight;
        } else if ( defaultIndex === upperCount){
          translate = 0;
        } else {
          //less
          translate += ( Math.abs(upperCount - defaultIndex) * itemHeight);
        }
        //if(props.groupIndex == 2) console.log(defaultIndex,translate, upperCount)
      } else {
        //total item less than indicator height
        translate -= itemHeight * defaultIndex;
      }
    }

    this.setState({
      selected: defaultIndex,
      ogTranslate: translate,
      totalHeight,
      translate,
      itemHeight,
      indicatorTop,
      indicatorHeight,
    }, () => defaultIndex > -1 ? this.updateSelected(false) : this.updateSelected() );
  }

  updateSelected(propagate = true){
    const {items, onChange, groupIndex} = this.props;
    const {itemHeight, indicatorTop, indicatorHeight,} = this.state
    let selected = 0;
    items.forEach( (item, i) => {
      //console.log(i, this.state.translate, (this.state.translate + (itemHeight * i)), indicatorTop, this.state.translate + (itemHeight * i) + itemHeight , indicatorTop + indicatorHeight)
      if ( !item.disabled && (this.state.translate + (itemHeight * i)) >= indicatorTop &&
        ( this.state.translate + (itemHeight * i) + itemHeight ) <= indicatorTop + indicatorHeight ){
        selected = i;
      }
    });

    if (onChange && propagate) onChange(items[selected], selected, groupIndex);
  }

  handleTouchStart(e){
    if (this.state.touching || this.props.items.length <= 1) return;

    this.setState({
      touching: true,
      ogTranslate: this.state.translate,
      touchId: e.targetTouches[0].identifier,
      ogY: this.state.translate === 0 ? e.targetTouches[0].pageY : e.targetTouches[0].pageY - this.state.translate,
      animating: false
    });
  }

  handleTouchMove(e){
    if (!this.state.touching || this.props.items.length <= 1) return;
    if (e.targetTouches[0].identifier !== this.state.touchId) return;

    //prevent move background
    e.preventDefault();

    const pageY = e.targetTouches[0].pageY;
    const diffY = pageY - this.state.ogY;

    this.setState({
      translate: diffY
    });
  }

  handleTouchEnd(e){
    if (!this.state.touching || this.props.items.length <= 1) return;

    const {indicatorTop, indicatorHeight, itemHeight} = this.state;

    let translate = this.state.translate;

    if ( Math.abs(translate - this.state.ogTranslate) < ( itemHeight * .51 ) ){
      translate = this.state.ogTranslate;
    } else if (translate > indicatorTop) {
      //top boundry
      translate = indicatorTop;
    } else if (translate + this.state.totalHeight < indicatorTop + indicatorHeight) {
      //bottom
      translate = indicatorTop + indicatorHeight - this.state.totalHeight;
    } else {
      //pass single item range but not exceed boundry
      let step = 0, adjust = 0;
      let diff = (translate - this.state.ogTranslate) / itemHeight;

      if (Math.abs(diff) < 1){
        step = diff > 0 ? 1 : -1;
      } else {
        adjust = Math.abs((diff % 1) * 100) > 50 ? 1 : 0;
        step = diff > 0 ? Math.floor(diff) + adjust : Math.ceil(diff) - adjust;
      }

      translate = this.state.ogTranslate + ( step * itemHeight );
    }

    this.setState({
      touching: false,
      ogY: 0,
      touchId: undefined,
      ogTranslate: 0,
      animating: true,
      translate
    }, ()=>this.updateSelected());
  }


  render () {
    const {items, className, mapKeys} = this.props
    const otherProps = omit(this.props, 'items', 'className', 'height', 'onChange', 'animation', 'groupIndex', 'defaultIndex', 'mapKeys',)
    const cls = classNames('mi-picker__group', className)
    const styles = {
      'transform': `translate(0, ${this.state.translate}px)`,
      'transition': this.state.animating ? 'transform .3s' : 'none'
    }
    return (
      <div className={cls} { ...otherProps }
           onTouchStart={this.handleTouchStart}
           onTouchMove={this.handleTouchMove}
           onTouchEnd={this.handleTouchEnd}
      >
        <div className="mi-picker__mask"/>
        <div className="mi-picker__indicator" ref={ref => this.indicator = ref}/>
        <div
          className="mi-picker__content"
          style={styles}
          ref={ref => this.content = ref}
        >
          {
            items.map((item, j) => {
              const label = item[mapKeys.label]
              const itemCls = classNames('mi-picker__item', {
                'mi-picker__item_disabled': item.disabled
              })

              return (
                <div key={j} className={itemCls}>{ label }</div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

