
import ReactTable from "react-table";
import "react-table/react-table.css";

import Chance from "chance";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import testData from "./test_data";

const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();

function getData() {
  const data = testData.map(item => {
    const _id = chance.guid();
    return {
      _id,
      ...item
    };
  });
  return data;
}

function getColumns(data) {
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach(key => {
    if (key !== "_id") {
      columns.push({
        accessor: key,
        Header: key
      });
    }
  });
  return columns;
}

class App extends React.Component {
  constructor() {
    super();
    const data = getData();
    const columns = getColumns(data);
    this.state = {
      data,
      columns,
      selection: [],
      selectAll: false
    };
  }

  toggleSelection = (key, shift, row) => {

    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      selection.push(key);
    }
    this.setState({ selection });
  };

  toggleAll = () => {

    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    return this.state.selection.includes(key);
  };

  logSelection = () => {
    console.log("selection:", this.state.selection);
  };

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
    const { data, columns, selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTrProps: (s, r) => {
        // someone asked for an example of a background color change
        // here it is...
        const selected = this.isSelected(r.original._id);
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit"
            // color: selected ? 'white' : 'inherit',
          }
        };
      }
    };

    return (
      <div>
        <button onClick={logSelection}>Log Selection</button>
        <CheckboxTable
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
