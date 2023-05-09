import { StyleSheet } from "react-native";

export const tabStyles = StyleSheet.create({
  headerShown: false,
  tabBarActiveTintColor: "#2e64e5",
  tabBarStyle: [
    {
      display: "flex",
    },
    null,
  ],
});

export const mapStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "85%",
  },
  map: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 22,
    height: 22,
  },
});

export const signInStyles = StyleSheet.create({
  container: {
    fontSize: 53,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: { color: "black", fontSize: 40, margin: 20 },
  user: {
    justifyContent: "center",
    textAlign: "center",
  },
  Input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 25,
    // padding: 55,
  },
  inputContainer: {
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 15,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
  },
  buttonOutline: {
    padding: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#24a0ed",
    marginBottom: 30,
  },
  buttonOutlineText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pageLink: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  signUp: {
    color: "#24a0ed",
    fontWeight: "bold",
  },
  twoButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  GoogleButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "black",
    justifyContent: "center",
    alignitems: "center",
    flexDirection: "row",
  },
  GoogleImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    alignContent: "center",
    justifyContent: "center",
  },
  GoogleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
    marginLeft: 10,
  },
});

export const signUpStyles = StyleSheet.create({
  container: {
    fontSize: 53,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "60%",
  },
  Input: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 25,
    // padding: 55,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#24a0ed",
  },
  buttonOutlineText: {
    color: "white",
    fontSize: 18,
    // fontWeight: "#24a0ed",
  },
  heading: {
    color: "black",
    fontSize: 40,
    margin: 20,
  },
});
