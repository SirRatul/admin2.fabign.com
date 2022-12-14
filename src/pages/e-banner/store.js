import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AlignJustify } from "react-feather";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { EBannerForm } from "../../components/form/EBannerForm";

const Store = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  console.log("hello");
  // handle category create
  const handleEBannerCreate = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.EBanner.Store(data);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
        history.push("/dashboard/e-banner");
      }
      setLoading(false);
    } catch (error) {
      if (error) {
        setLoading(false);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Add E-banner"
        subTitle="Add new e-banner"
        tag="Home / E-commerce / E-banner /"
        pageTag="Add e-banner"
      />

      {/* Manage e-banner button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-banner"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              {" "}
              <AlignJustify size={20} /> Manage e-banner
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main e-banner card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">Add E-Banner</Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* E-Banner Form */}
            <EBannerForm loading={loading} submit={handleEBannerCreate} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Store;
