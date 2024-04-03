import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 2,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  infoButton: {
    backgroundColor: "#ADD8E6",
  },

  deleteButton: {
    backgroundColor: "red",
  },

  deleteButtonModal: {
    marginTop: 14,
    backgroundColor: "red",
  },

  buttonText: {
    color: "white",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  //MODAL
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
  },
});
