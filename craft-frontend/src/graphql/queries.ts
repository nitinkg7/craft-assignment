import gql from "graphql-tag";

export const GET_INSTITUTES = gql`
  query getInstitutes {
    institutesEntries {
      ... on institutes_institute_Entry {
        id
        title
      }
    }
  }
`;

export const SUBMIT_PROFILE = gql`
  mutation submitProfile($name: String, $age: Number, $instituteName: [Int]) {
    save_profile_profile_Entry(profile_name: $name, age: $age, instituteName: $instituteName) {
      id
    }
  }
`;
