import { gql, ApolloServer } from "apollo-server-micro";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
    type Site @exclude(operations: [CREATE, UPDATE, DELETE]) {
        area: Float
        artifactCollections: [ArtifactCollection] @relationship(type: "HAS_COLLECTION", direction: OUT)
        beginAge: Int
        beginPhase: Int
        country: String
        county: String
        culture: String
        endAge: Int
        endPhase: Int
        features: [Feature] @relationship(type: "HAS_FEATURE", direction: OUT)
        # functionalStrati: [???]
        # horizontalFeatures: [???] # possibly also relates to Features
        # horizontalSubFeatures: [???] # possibly also relates to Features
        hu2: Int
        hu4: Int
        hu6: Int
        hu8: Int
        hu10: Int
        latitude: Float!
        length: Float
        # levels: [???]
        # loci: ???
        longitude: Float!
        maxRooms: Int
        meanRooms: Int
        microRegion: String
        macroRegion: String
        minRooms: Int
        name: String!
        roomPeriods: [Int]
        # percentages: [???]
        periods: [Int]
        provenance: [Provenance] @relationship(type: "HAS_PROVENANCE", direction: OUT)
        provenanceEvents: [ProvenanceEvent] @relationship(type: "HAS_PROVENANCE_EVENT", direction: OUT)
        state: String
        systemMaps: [SystemMap] @relationship(type: "HAS_SYSTEM_MAP", direction: OUT)
        # units: [???]
        # uuid: ID!
        # verticalStrati: [???]
        width: Float
    }


    type ArtifactCollection @exclude(operations: [CREATE, UPDATE, DELETE]) {
        artifactType: ArtifactType @relationship(type: "IS_OF_TYPE", direction: OUT)
        count: Int
        # functionalStratum: ???
        # horizontalFeature: ???
        # horizontalSubFeature: ???
        # level: ???
        # locus: ???
        # site: Site @relationship(type: "HAS_COLLECTION", direction: IN) # (uuid?)
        source: String
        # unit: ???
        # uuid: ID!
        # verticalStratum: ???
    }

    type Provenance @exclude(operations: [CREATE, UPDATE, DELETE]) {
        date: Date
        # collectionMethod: ???
        hasIntrasite: Boolean
        isOld: Boolean
        isSubsurface: Boolean
        isScreened: Boolean
        # nodes: [???]
        people: [People] @relationship(type: "RECORDED_BY", direction: OUT)
        # source: ???
        sourceDisplayName: String
        subSection: String
        # uuid: ID!
    }

    type Feature @exclude(operations: [CREATE, UPDATE, DELETE]) {
        area: Float
        architecture: Boolean
        attributes: [Attribute]
        # contextPlot: ???
        date: Date
        details: String
        diameter: Float
        diameterAboveBenchMin: Float
        diameterAboveBenchMax: Float
        featureType: FeatureType
        featureTypeName: String
        hasAttachedRooms: Boolean
        hasKivaInside: Boolean
        height: Float
        # humanOrAnimal: ???
        isCremation: Boolean
        isHuman: Boolean
        isMound: Boolean
        isPrimary: Boolean
        isRocks: Boolean
        length: Float
        minStoreys: Int
        maxStoreys: Int
        # orientation: ???
        position: String
        primary: Boolean
        provenance: [Provenance] @relationship(type: "HAS_PROVENANCE", direction: OUT)
        public: Boolean
        relationToPlaza: String
        sites: [Site] @relationship(type: "HAS_FEATURE", direction: IN)
        shape: String
        storiesMax: Int
        storiesMin: Int
        surfaceArea: Float
        type: String
        use: String
        # uuid: ID!
        width: Float
        volume: Float
    }

    enum FeatureType {
        AgriculturalFeature
        Ballcourt
        Burial
        Concentration
        GreatHouse
        GreatKiva
        Pit
        ReligiousArchitecture
        MultiwallStructure
        MortuaryFeature
    }

    type Attribute @exclude(operations: [CREATE, UPDATE, DELETE]) {
        area: Float
        construction: String
        count: Int
        diameter: Float
        height: Float
        length: Float
        # location: ??? 
        minDiameter: Float
        maxDiameter: Float
        # orientation: ???
        shape: String
        surfaceArea: Float
        type: String
        # uuid: ID!
        width: Float
        volume: Float

    }

    type SystemMap @exclude(operations: [CREATE, UPDATE, DELETE]) {
        site: Site @relationship(type: "HAS_SYSTEM_MAP", direction: OUT)
        system: String
        # uuid: ID!
        value: String
    }

    type ArtifactType @exclude(operations: [CREATE, UPDATE, DELETE]) {
        artifactType: String
        beginAge: Int
        canChronologyBuilding: Boolean
        ceramicWare: CeramicWare @relationship(type: "HAS_WARE", direction: OUT)
        decoration: String
        endAge: Int
        isCorrugated: Boolean
        isDecorated: Boolean
        isRedSlipped: Boolean
        name: String
        # uuid: ID!
    }

    type CeramicWare @exclude(operations: [CREATE, UPDATE, DELETE]) {
        name: String
        # uuid: ID!
    }

    type People @exclude(operations: [CREATE, UPDATE, DELETE]) {
        firstName: String
        middleName: String
        lastName: String
        suffix: String
        # uuid: ID!
    }

    type ProvenanceEvent @exclude(operations: [CREATE, UPDATE, DELETE]) {
        provenance: Provenance @relationship(type: "HAS_PROVENANCE", direction: OUT)
        uuid: ID!
    }
`;

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
        process.env.NEO4J_USER, 
        process.env.NEO4J_PASSWORD
    )
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

// const apolloServer = new ApolloServer({ schema: neoSchema.schema });

const apolloServer = new ApolloServer({
    schema: neoSchema.schema,
    playground: true,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
    // res.setHeader("Access-Control-All   ow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // if (req.method === "OPTIONS") {
    //     res.end();
    //     return false;
    // }

    await startServer;

    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};