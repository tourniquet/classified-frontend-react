import React from 'react'

// components
import DropDownButton from '../../../../components/Buttons/DropDownButton/DropDownButton'
import Label from '../../../../components/Label/Label'
import RequiredInput from '../RequiredInput/RequiredInput'
import UnorderedList from '../../../../components/UnorderedList/UnorderedList'

const Dropdown = props =>
  <>
    {/** price dropdown has no label */}
    {(props.labelFor && props.labelTitle) &&
      <Label
        className='mandatory'
        htmlFor={props.labelFor}
        title={props.labelTitle}
      />}
    <DropDownButton
      className={
        props.dropDownButtonActive
          ? 'button desktop-button active-tab'
          : 'button desktop-button inactive-tab'
      }
      title={props.dropDownButtonTitle}
      onClick={props.dropDownButtonClickHandler}
    >
      <i /> {/* arrow icon */}

      {props.required &&
        <RequiredInput value={`${props.requiredInputValue}`} />
      }
    </DropDownButton>

    <UnorderedList
      className={props.unorderedListActive ? 'show-ul-menu' : 'hide-ul-menu'}
    >
      {props.itemsArray.map(item => (
        <li
          key={item.id.toString()}
          onClick={() => props.unorderedListClickHandler(item.id, item.title)}
        >
          {item.title}
        </li>
      ))}
    </UnorderedList>
  </>

export default Dropdown
