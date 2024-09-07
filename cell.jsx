import "./cell.css";
import classNames from "classnames";

export function Cell(props) {
  return (
    <div
      className={classNames("cell", props.status)}
      onClick={() => props.onClick(props.index)}
    >
      {props.status === "crossed" && <div className="left-cross" />}
      {props.status === "crossed" && <div className="right-cross" />}
      {props.number}
    </div>
  );
}
