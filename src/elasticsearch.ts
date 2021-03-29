import elastic from 'elasticsearch';

export const elasticClient = new elastic.Client({
  host: 'localhost:9200'
});