import { SmileIcon, MehIcon, AnnoyedIcon, FrownIcon } from "lucide-react";

export const getHappiness = (happiness) => {
  if (happiness > 80) {
    return <p className="ibm-plex-mono-regular">Very Happy</p>;
  } else if (happiness > 60) {
    return <p className="ibm-plex-mono-regular">Happy</p>;
  } else if (happiness > 40) {
    return <p className="ibm-plex-mono-regular">Fine</p>;
  } else if (happiness > 20) {
    return <p className="ibm-plex-mono-regular">Unhappy</p>;
  }
  return <p className="ibm-plex-mono-regular">Very Unhappy</p>;
};

export const getHealth = (health) => {
  if (health > 80) {
    return <p className="ibm-plex-mono-regular text-center">Healthy</p>;
  } else if (health > 50) {
    return <p className="ibm-plex-mono-regular text-center">Feeling Okay</p>;
  } else if (health > 20) {
    return <p className="ibm-plex-mono-regular text-center">Not Doing Well</p>;
  }
  return (
    <p className="ibm-plex-mono-regular text-center">In Critical Condition</p>
  );
};

export const getHealthIcon = (health) => {
  if (health > 80) {
    return (
      <div className="flex items-center">
        <SmileIcon className="w-8 h-8 mr-3" />
      </div>
    );
  } else if (health > 50) {
    return (
      <div className="flex items-center">
        <MehIcon className="w-8 h-8 mr-3" />
      </div>
    );
  } else if (health > 20) {
    return (
      <div className="flex items-center">
        <AnnoyedIcon className="w-8 h-8 mr-3" />
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <FrownIcon className="w-8 h-8 mr-3" />
    </div>
  );
};

export const getIntelligence = (intelligence) => {
  if (intelligence > 95) {
    return <p className="ibm-plex-mono-regular text-end">Genius</p>;
  } else if (intelligence > 80) {
    return <p className="ibm-plex-mono-regular text-end">Gifted</p>;
  } else if (intelligence > 60) {
    return <p className="ibm-plex-mono-regular text-end">Above Average</p>;
  } else if (intelligence > 40) {
    return <p className="ibm-plex-mono-regular text-end">Average</p>;
  } else if (intelligence > 20) {
    return <p className="ibm-plex-mono-regular text-end">Kinda Dumb</p>;
  }
  return <p className="ibm-plex-mono-regular text-end">Idiot</p>;
};

export const getCharisma = (charisma) => {
  if (charisma > 95) {
    return <p className="ibm-plex-mono-regular text-end">Cult Leader</p>;
  } else if (charisma > 80) {
    return <p className="ibm-plex-mono-regular text-end">Very Likeable</p>;
  } else if (charisma > 60) {
    return <p className="ibm-plex-mono-regular text-end">Likeable</p>;
  } else if (charisma > 40) {
    return <p className="ibm-plex-mono-regular text-end">Average</p>;
  } else if (charisma > 20) {
    return (
      <p className="ibm-plex-mono-regular text-end">Somewhat Offputting</p>
    );
  }
  return <p className="ibm-plex-mono-regular text-end">Super Weird</p>;
};

export const getFitness = (fitness) => {
  if (fitness > 95) {
    return <p className="ibm-plex-mono-regular text-end">Greek God</p>;
  } else if (fitness > 80) {
    return <p className="ibm-plex-mono-regular text-end">Elite Athlete</p>;
  } else if (fitness > 60) {
    return <p className="ibm-plex-mono-regular text-end">Strong</p>;
  } else if (fitness > 40) {
    return <p className="ibm-plex-mono-regular text-end">Decent</p>;
  } else if (fitness > 20) {
    return <p className="ibm-plex-mono-regular text-end">Kinda Scrawny</p>;
  }
  return <p className="ibm-plex-mono-regular text-end">Weakling</p>;
};

export const getCreativity = (creativity) => {
  if (creativity > 95) {
    return <p className="ibm-plex-mono-regular text-end">Da Vinci</p>;
  } else if (creativity > 80) {
    return <p className="ibm-plex-mono-regular text-end">Idea Machine</p>;
  } else if (creativity > 60) {
    return <p className="ibm-plex-mono-regular text-end">Talented</p>;
  } else if (creativity > 40) {
    return <p className="ibm-plex-mono-regular text-end">Average</p>;
  } else if (creativity > 20) {
    return <p className="ibm-plex-mono-regular text-end">Less Artistic</p>;
  }
  return <p className="ibm-plex-mono-regular text-end">Uninspired</p>;
};

export const getPhysicalAttractiveness = (physicalAttractiveness) => {
  if (physicalAttractiveness > 95) {
    return <p className="ibm-plex-mono-regular">Model</p>;
  } else if (physicalAttractiveness > 80) {
    return <p className="ibm-plex-mono-regular">Pretty Hot</p>;
  } else if (physicalAttractiveness > 60) {
    return <p className="ibm-plex-mono-regular">Decently Attractive</p>;
  } else if (physicalAttractiveness > 40) {
    return <p className="ibm-plex-mono-regular">Average</p>;
  } else if (physicalAttractiveness > 20) {
    return <p className="ibm-plex-mono-regular">Not Very Attractive</p>;
  }
  return <p className="ibm-plex-mono-regular">Plain Ugly</p>;
};

export const getRelationshipStatus = (relationshipStatus) => {
  if (relationshipStatus >= 10) {
    return <p className="ibm-plex-mono-regular ml-2">Pure Love</p>;
  } else if (relationshipStatus >= 8) {
    return <p className="ibm-plex-mono-regular ml-2">Very Good</p>;
  } else if (relationshipStatus >= 5) {
    return <p className="ibm-plex-mono-regular ml-2">Good</p>;
  } else if (relationshipStatus >= 3) {
    return <p className="ibm-plex-mono-regular ml-2">Lukewarm</p>;
  } else if (relationshipStatus >= 1) {
    return <p className="ibm-plex-mono-regular ml-2">Bad</p>;
  }
  return <p className="ibm-plex-mono-regular ml-2">Total Hatred</p>;
};
