import { gql } from '@apollo/client';

export const GET_PATTERNS = gql`
  query {
    patterns {
      id
      title
      name
      ring
      quadrant
      status
      phase
      tags {
        tagId
        tagName
        tagValue
      }
    }
  }
`;

export const GET_PATTERN = gql`
  query GetPattern($id: ID!) {
    patternById(id: $id) {
      id
      title
      name
      ring
      quadrant
      status
      phase
      description
      tags {
        tagId
        tagName
        tagValue
      }
    }
  }
`;

export const CREATE_PATTERN = gql`
  mutation CreatePattern($input: PatternInput!) {
    createPattern(input: $input) {
      id
      title
      name
      ring
      quadrant
      status
      phase
      description
    }
  }
`;

export const UPDATE_PATTERN = gql`
  mutation UpdatePattern($id: ID!, $input: PatternInput!) {
    updatePattern(id: $id, input: $input) {
      id
      title
      name
      ring
      quadrant
      status
      phase
      description
    }
  }
`;

export const DELETE_PATTERN = gql`
  mutation DeletePattern($id: ID!) {
    deletePattern(id: $id)
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($patternId: ID!, $input: TagInput!) {
    createTag(patternId: $patternId, input: $input) {
      tagId
      tagName
      tagValue
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($patternId: ID!, $tagId: ID!, $input: TagInput!) {
    updateTag(patternId: $patternId, tagId: $tagId, input: $input) {
      tagId
      tagName
      tagValue
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($patternId: ID!, $tagId: ID!) {
    deleteTag(patternId: $patternId, tagId: $tagId)
  }
`;
