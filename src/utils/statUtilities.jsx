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
    return <p className="ibm-plex-mono-regular text-center">Genius</p>;
  } else if (intelligence > 80) {
    return <p className="ibm-plex-mono-regular text-center">Gifted</p>;
  } else if (intelligence > 60) {
    return <p className="ibm-plex-mono-regular text-center">Above Average</p>;
  } else if (intelligence > 40) {
    return <p className="ibm-plex-mono-regular text-center">Average</p>;
  } else if (intelligence > 20) {
    return <p className="ibm-plex-mono-regular text-center">Kinda Dumb</p>;
  }
  return <p className="ibm-plex-mono-regular text-center">Idiot</p>;
};

export const getCharisma = (charisma) => {
  if (charisma > 95) {
    return <p className="ibm-plex-mono-regular text-center">Cult Leader</p>;
  } else if (charisma > 80) {
    return <p className="ibm-plex-mono-regular text-center">Very Likeable</p>;
  } else if (charisma > 60) {
    return <p className="ibm-plex-mono-regular text-center">Likeable</p>;
  } else if (charisma > 40) {
    return <p className="ibm-plex-mono-regular text-center">Average</p>;
  } else if (charisma > 20) {
    return (
      <p className="ibm-plex-mono-regular text-center">Somewhat Offputting</p>
    );
  }
  return <p className="ibm-plex-mono-regular text-center">Super Weird</p>;
};

export const getFitness = (fitness) => {
  if (fitness > 95) {
    return <p className="ibm-plex-mono-regular text-center">Greek God</p>;
  } else if (fitness > 80) {
    return <p className="ibm-plex-mono-regular text-center">Elite Athlete</p>;
  } else if (fitness > 60) {
    return <p className="ibm-plex-mono-regular text-center">Strong</p>;
  } else if (fitness > 40) {
    return <p className="ibm-plex-mono-regular text-center">Decent</p>;
  } else if (fitness > 20) {
    return <p className="ibm-plex-mono-regular text-center">Kinda Scrawny</p>;
  }
  return <p className="ibm-plex-mono-regular text-center">Weakling</p>;
};

export const getCreativity = (creativity) => {
  if (creativity > 95) {
    return <p className="ibm-plex-mono-regular text-center">Da Vinci</p>;
  } else if (creativity > 80) {
    return <p className="ibm-plex-mono-regular text-center">Idea Machine</p>;
  } else if (creativity > 60) {
    return <p className="ibm-plex-mono-regular text-center">Talented</p>;
  } else if (creativity > 40) {
    return <p className="ibm-plex-mono-regular text-center">Average</p>;
  } else if (creativity > 20) {
    return <p className="ibm-plex-mono-regular text-center">Less Artistic</p>;
  }
  return <p className="ibm-plex-mono-regular text-center">Uninspired</p>;
};

export const getPhysicalAttractiveness = (physicalAttractiveness) => {
  if (physicalAttractiveness > 95) {
    return <p className="ibm-plex-mono-regular text-center">Model</p>;
  } else if (physicalAttractiveness > 80) {
    return <p className="ibm-plex-mono-regular text-center">Pretty Hot</p>;
  } else if (physicalAttractiveness > 60) {
    return (
      <p className="ibm-plex-mono-regular text-center">Decently Attractive</p>
    );
  } else if (physicalAttractiveness > 40) {
    return <p className="ibm-plex-mono-regular text-center">Average</p>;
  } else if (physicalAttractiveness > 20) {
    return (
      <p className="ibm-plex-mono-regular text-center">Not Very Attractive</p>
    );
  }
  return <p className="ibm-plex-mono-regular text-center">Plain Ugly</p>;
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
