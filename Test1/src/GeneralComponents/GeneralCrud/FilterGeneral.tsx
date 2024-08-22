import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaArrowsAltV, FaSortUp, FaSortDown } from 'react-icons/fa';

type Orders = "ASC" | "DESC" | "neutral";

interface FilterGeneralProps {
  onClick: () => void;
  name: string;
  setOrder: (value: React.SetStateAction<Orders>) => void;
  order: Orders;
}

const FilterGeneral: React.FC<FilterGeneralProps> = ({ onClick, name, setOrder, order }) => {

  const handleClick = () => {
    onClick();
    switch (order) {
      case "ASC":
        setOrder("DESC");
        break;
      case "DESC":
        setOrder("neutral");
        break;
      default:
        setOrder("ASC");
        break;
    }
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {order === "ASC" ? "Orden ascendente" : order === "DESC" ? "Orden descendente" : "Ordenar"}
    </Tooltip>
  );

  return (
    <div className="d-flex align-items-center">
      <ButtonGroup>
        <Button
          variant="link"
          className="text-dark"
          onClick={handleClick}
          aria-label={`Ordenar por ${name}`}
        >
          {name}
        </Button>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button
            variant="link"
            className="text-dark"
            onClick={handleClick}
            aria-label="Cambiar orden"
          >
            {order === "ASC" ? <FaSortUp /> : order === "DESC" ? <FaSortDown /> : <FaArrowsAltV />}
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </div>
  );
};

export default FilterGeneral;
