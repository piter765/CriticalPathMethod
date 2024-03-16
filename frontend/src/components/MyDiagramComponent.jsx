import go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./../App.css";

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

  // colors used, named for easier identification
  var blue = "#0288D1";
  var pink = "#B71C1C";
  var pinkfill = "#F8BBD0";
  var bluefill = "#B3E5FC";

  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
    initialAutoScale: go.Diagram.Uniform,
    layout: $(go.LayeredDigraphLayout, {
      alignOption: go.LayeredDigraphLayout.AlignAll,
    }),
    model: new go.GraphLinksModel({
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "Rectangle", // the border
      { fill: "white", strokeWidth: 2 },
      new go.Binding("fill", "critical", (b) => (b ? pinkfill : bluefill)),
      new go.Binding("stroke", "critical", (b) => (b ? pink : blue))
    ),
    $(
      go.Panel,
      "Table",
      { padding: 0.5 },
      $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
      $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
      $(go.RowColumnDefinition, {
        row: 1,
        separatorStroke: "black",
        background: "white",
        coversSeparators: true,
      }),
      $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
      $(
        go.TextBlock, // earlyStart
        new go.Binding("text", "earlyStart"),
        { row: 0, column: 0, margin: 5, textAlign: "center" }
      ),
      $(go.TextBlock, new go.Binding("text", "length"), {
        row: 0,
        column: 1,
        margin: 5,
        textAlign: "center",
      }),
      $(
        go.TextBlock, // earlyFinish
        new go.Binding("text", "earlyFinish",),
        { row: 0, column: 2, margin: 5, textAlign: "center" }
      ),

      $(go.TextBlock, new go.Binding("text", "text"), {
        row: 1,
        column: 0,
        columnSpan: 3,
        margin: 5,
        textAlign: "center",
        font: "bold 14px sans-serif",
      }),

      $(
        go.TextBlock, // slack
        new go.Binding("text", "reserve"),
        { row: 2, column: 1, margin: 5, textAlign: "center" }
      ),
      $(
        go.TextBlock, // lateFinish
        new go.Binding("text", "lateFinish"),
        { row: 2, column: 2, margin: 5, textAlign: "center" }
      )
    ) // end Table Panel
  ); // end Node

  function linkColorConverter(linkdata, elt) {
    var link = elt.part;
    if (!link) return blue;
    var f = link.fromNode;
    if (!f || !f.data || !f.data.critical) return blue;
    var t = link.toNode;
    if (!t || !t.data || !t.data.critical) return blue;
    return pink; // when both Link.fromNode.data.critical and Link.toNode.data.critical
  }

  diagram.linkTemplate =
  $(go.Link,
    { toShortLength: 6, toEndSegmentLength: 20 },
    $(go.Shape,
      { strokeWidth: 4 },
      new go.Binding("stroke", "", linkColorConverter)),
    $(go.Shape,  // arrowhead
      { toArrow: "Triangle", stroke: null, scale: 1.5 },
      new go.Binding("fill", "", linkColorConverter)),
    $(go.TextBlock, // text value
      {
        segmentOffset: new go.Point(0, -10), // Adjust segment offset to position the text above the arrow
        segmentIndex: 0.5, // Set segment index to 0.5 to position the text in the middle
        segmentFraction: 0.5, // Set segment fraction to 0.5 to position the text in the middle
        textAlign: "center",
        font: "bold 16px sans-serif"
      },
      new go.Binding("text", "", function(linkData) {
        return linkData.name + " " + linkData.length;
      }))
  );

  //legend
  diagram.add(
    $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        "Rectangle", // the border
        { fill: "#EEEEEE" }
      ),
      $(
        go.Panel,
        "Table",
        $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
        $(go.RowColumnDefinition, { column: 2, separatorStroke: "black" }),
        $(go.RowColumnDefinition, {
          row: 1,
          separatorStroke: "black",
          background: "#EEEEEE",
          coversSeparators: true,
        }),
        $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
        $(go.TextBlock, "Early Start", {
          row: 0,
          column: 0,
          margin: 5,
          textAlign: "center",
        }),
        $(go.TextBlock, "Length", {
          row: 0,
          column: 1,
          margin: 5,
          textAlign: "center",
        }),
        $(go.TextBlock, "Early Finish", {
          row: 0,
          column: 2,
          margin: 5,
          textAlign: "center",
        }),

        $(go.TextBlock, "Activity Name", {
          row: 1,
          column: 0,
          columnSpan: 3,
          margin: 5,
          textAlign: "center",
          font: "bold 14px sans-serif",
        }),

        $(go.TextBlock, "Late Start", {
          row: 2,
          column: 0,
          margin: 5,
          textAlign: "center",
        }),
        $(go.TextBlock, "Slack", {
          row: 2,
          column: 1,
          margin: 5,
          textAlign: "center",
        }),
        $(go.TextBlock, "Late Finish", {
          row: 2,
          column: 2,
          margin: 5,
          textAlign: "center",
        })
      ) // end Table Panel
    )
  );

  return diagram;
}

function handleModelChange(changes) {
  //alert("GoJS model changed!");
}

function MyDiagramComponent({ nodeDataArray, linkDataArray }) {
  return (
    <div>
      <ReactDiagram
        divClassName="diagram-component"
        initDiagram={initDiagram}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        //modelData={this.props.modelData}
        onModelChange={handleModelChange}
        //skipsDiagramUpdate={this.props.skipsDiagramUpdate}
      />
    </div>
  );
}

export default MyDiagramComponent;
