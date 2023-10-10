import Dropdown from 'react-bootstrap/Dropdown';

function CustomDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle split style={{background:"transparent",color:"red",border:"unset"}} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropdown;