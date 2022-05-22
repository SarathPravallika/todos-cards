import Card from "../Card";
import { CardVariants } from "../Card/Card.constants";
import "./CardsList.scss";

function CardsList(props) {
  const {
    cards,
    activeId,
    setActiveId,
    activeContent,
    setActiveContent,
    handleActivateCard,
    handleSubmit,
    handleDelete,
  } = props;

  return (
    <ul className="cards-list">
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            {...card}
            isActive={activeId === card.id}
            setActiveId={setActiveId}
            activeContent={activeContent}
            setActiveContent={setActiveContent}
            handleActivateCard={handleActivateCard}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
          />
        );
      })}
      <Card
        variant={CardVariants.ADD_CARD}
        setActiveId={setActiveId}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        handleActivateCard={handleActivateCard}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    </ul>
  );
}

export default CardsList;
