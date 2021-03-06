import { gql } from "@apollo/client";

export const QUERY_ME_PETOWNER = gql`
  query Me {
    me {
      petOwner {
        _id
        name
        petsOwned {
          _id
          name
          ratings
          size {
            name
            _id
          }
          description
          image
          health {
            name
            _id
          }
          sociability {
            name
            _id
          }
        }
        eventsOwned {
          _id
          pets {
            name
            _id
          }
          daysOfEvent {
            _id
            start
            end
          }
          petSitter {
            name
            _id
          }
          petOwner {
            _id
          }
          status
          petsRating
          petSitterRating
          price
          contactInfo
        }
      }
      user {
        username
        _id
        email
        role
      }
    }
  }
`;
export const QUERY_ME_PETSITTER = gql`
  query Me {
    me {
      user {
        username
        _id
        email
        role
      }
      petSitter {
        _id
        name
        services {
          _id
          name
        }
        ratePerNight
        description
        image
        sizes {
          _id
          name
        }
        healthReady {
          _id
          name
        }
        socialReady {
          _id
          name
        }
        ratings
        availability
        daysOff {
          _id
          start
          end
        }
        eventsOffered {
          _id
          petOwner {
            _id
            name
          }
          pets {
            _id
            name
          }
          daysOfEvent {
            _id
            start
            end
          }
          petSitter {
            _id
          }
          price
          status
          petSitterRating
          petsRating
          contactInfo
        }
      }
    }
  }
`;

export const PETSITTER = gql`
  query petSitter($petSitterId: ID!) {
    petSitter(_id: $petSitterId) {
      _id
      name
      services {
        name
      }
      ratePerNight
      description
      image
      sizes {
        name
      }
      healthReady {
        name
      }
      socialReady {
        name
      }
      ratings
      availability
    }
  }
`;
export const SEARCH_PETSITTERS = gql`
  query PetSitters(
    $size: ID!
    $health: ID!
    $sociability: ID!
    $services: [ID!]
    $daysStart: String!
    $daysEnd: String!
  ) {
    petSitters(
      size: $size
      health: $health
      sociability: $sociability
      services: $services
      daysStart: $daysStart
      daysEnd: $daysEnd
    ) {
      _id
      name
      services {
        name
      }
      image
      ratings
      ratePerNight
      sizes {
        name
        _id
      }
      healthReady {
        _id
        name
      }
      socialReady {
        _id
        name
      }
    }
  }
`;

export const GET_SIZES = gql`
  query sizes {
    sizes {
      _id
      name
    }
  }
`;
export const GET_HEALTHS = gql`
  query healths {
    healths {
      _id
      name
    }
  }
`;
export const GET_SERVICES = gql`
  query services {
    services {
      _id
      name
    }
  }
`;
export const GET_SOCIABILITIES = gql`
  query sociabilities {
    sociabilities {
      _id
      name
    }
  }
`;
export const PETS = gql`
  query pets {
    pets {
      name
      image
    }
  }
`;

// export const STATUS = gql`
//   query status {
//     status {
//       name
//     }
//   }
// `
