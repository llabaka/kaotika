import Helmets from "@/pages/api/models/HelmetModel";

// Mock MONGOOSE
jest.mock("./../../pages/api/models/HelmetModel");

// IMPORTANT!! DECLARE TYPES SINCE WE ARE WORKING IN TSX
const mockedInsertMany = Helmets.insertMany as jest.Mock;
const mockedFind = Helmets.find as jest.Mock;

describe("Helmets Model", () => {
  it("should insert helmets", async () => {

    //ARRANGE//

    const helmetData = [
      { name: "Helmet 1", value: 100, isUnique: false },
      { name: "Helmet 2", value: 200, isUnique: false },
    ];

    // Mock the INSERTMANY operation of Mongoose
    mockedInsertMany.mockResolvedValue(helmetData);

    //ACT//

    // Call the insertMany function
    const insertedHelmets = await Helmets.insertMany(helmetData);

    //ASSERT//

    // Verifying that the helmets were inserted correctly
    expect(insertedHelmets).toHaveLength(2);
    expect(insertedHelmets[0].name).toBe("Helmet 1");
    expect(insertedHelmets[1].name).toBe("Helmet 2");
  });

  it("should retrieve helmets", async () => {

    //ARRANGE//
    const helmetData = [
      { name: "Helmet 1", value: 100, isUnique: false },
      { name: "Helmet 2", value: 200, isUnique: false },
    ];

    // Mock the FIND operation of Mongoose
    mockedFind.mockResolvedValue(helmetData);

    //ACT//

    const helmets = await Helmets.find();

    //ASSERT//

    // Verifying that the retrieved helmets are correct
    expect(helmets).toHaveLength(2);
    expect(helmets[0].name).toBe("Helmet 1");
    expect(helmets[1].name).toBe("Helmet 2");
  });
});
