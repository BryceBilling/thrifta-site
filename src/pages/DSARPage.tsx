import { useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Button,
  Alert,
} from "antd";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo.webp";
import logoText from "../assets/thrifta.webp";
import SiteFooter from "../components/SiteFooter";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const DETAILS_MAX_LENGTH = 1024;
const FORM_NAME = "dsar-request";

type DsarFormValues = {
  website: string;
  name: string;
  email: string;
  submittingAs: string;
  lawfulBasis: string;
  details?: string;
  confirmAccurate: boolean;
  confirmIrreversible: boolean;
  confirmValidation: boolean;
  "bot-field"?: string;
};

function encodeFormData(data: Record<string, string>) {
  return Object.keys(data)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
    )
    .join("&");
}

export default function DSARPage() {
  const [form] = Form.useForm<DsarFormValues>();
  const [detailsLength, setDetailsLength] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );

  const handleFinish = async (values: DsarFormValues) => {
    setStatus("submitting");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": FORM_NAME,
          website: values.website,
          name: values.name,
          email: values.email,
          submittingAs: values.submittingAs,
          lawfulBasis: values.lawfulBasis,
          details: values.details ?? "",
        }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Layout className="site-layout">
      <Header className="page-header">
        <div className="container">
          <Link to="/" className="page-brand">
            <img src={logoIcon} alt="Thrifta icon" className="page-brand-icon" />
            <img src={logoText} alt="Thrifta" className="page-brand-text" />
          </Link>
          <Link to="/" className="page-back-link">
            ← Back to home
          </Link>
        </div>
      </Header>

      <Content className="main-content">
        <section className="dsar-section">
          <div className="container">
            <Card className="dsar-card" bordered={false}>
              <Title level={2} className="dsar-title">
                Data Subject Access Request Form
              </Title>

              <Paragraph className="dsar-intro">
                Please fill in the information below. The website
                administrator or data protection officer will be notified of
                your request within 24 hours, and will need an appropriate
                amount of time to respond.
              </Paragraph>

              {status === "done" ? (
                <Alert
                  type="success"
                  showIcon
                  message="Request submitted"
                  description="Thank you — we've received your request and will follow up by email to verify your identity before proceeding."
                  className="dsar-alert"
                />
              ) : (
                <Form<DsarFormValues>
                  form={form}
                  layout="vertical"
                  name={FORM_NAME}
                  requiredMark={false}
                  onFinish={handleFinish}
                  className="dsar-form"
                >
                  {/* Honeypot field for spam bots, kept out of view for real users */}
                  <Form.Item name="bot-field" className="dsar-honeypot" hidden>
                    <Input tabIndex={-1} autoComplete="off" />
                  </Form.Item>

                  <Form.Item
                    label="Website"
                    name="website"
                    rules={[
                      { required: true, message: "Please tell us which website or app this relates to." },
                    ]}
                  >
                    <Input placeholder="e.g. Thrifta website or app" />
                  </Form.Item>

                  <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name." }]}
                  >
                    <Input placeholder="Full name" />
                  </Form.Item>

                  <Form.Item
                    label="What email address do you use to access the above website / app?"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email address." },
                      { type: "email", message: "Please enter a valid email address." },
                    ]}
                  >
                    <Input placeholder="you@example.com" />
                  </Form.Item>

                  <Form.Item
                    label="You are submitting this request as"
                    name="submittingAs"
                    rules={[{ required: true, message: "Please select an option." }]}
                  >
                    <Radio.Group className="dsar-radio-group">
                      <Radio value="self" className="dsar-radio">
                        The person, or the parent / guardian of the person,
                        whose name appears above.
                      </Radio>
                      <Radio value="agent" className="dsar-radio">
                        An agent authorized by the consumer to make this
                        request on their behalf.
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Under the rights of which law are you making this request?"
                    name="lawfulBasis"
                    rules={[{ required: true, message: "Please select a law." }]}
                  >
                    <Select placeholder="Select...">
                      <Select.Option value="gdpr-eu">
                        General Data Protection Regulation (GDPR) — EU
                      </Select.Option>
                      <Select.Option value="uk-gdpr">
                        UK General Data Protection Regulation (UK GDPR)
                      </Select.Option>
                      <Select.Option value="ccpa">
                        California Consumer Privacy Act (CCPA/CPRA)
                      </Select.Option>
                      <Select.Option value="other">
                        Other / not sure
                      </Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Please leave details regarding your action request or question."
                    name="details"
                  >
                    <TextArea
                      rows={4}
                      maxLength={DETAILS_MAX_LENGTH}
                      onChange={(e) => setDetailsLength(e.target.value.length)}
                    />
                  </Form.Item>
                  <Text className="dsar-char-count">
                    {detailsLength.toLocaleString()} /{" "}
                    {DETAILS_MAX_LENGTH.toLocaleString()}
                  </Text>

                  <div className="dsar-confirm-block">
                    <Text className="dsar-confirm-heading">I confirm that</Text>

                    <Form.Item
                      name="confirmAccurate"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("This confirmation is required."),
                                ),
                        },
                      ]}
                    >
                      <Checkbox>
                        Under penalty of perjury, I declare all the above
                        information to be true and accurate.
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="confirmIrreversible"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("This confirmation is required."),
                                ),
                        },
                      ]}
                    >
                      <Checkbox>
                        I understand that the deletion or restriction of my
                        personal data is irreversible and may result in the
                        termination of services with Thrifta.
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name="confirmValidation"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error("This confirmation is required."),
                                ),
                        },
                      ]}
                    >
                      <Checkbox>
                        I understand that I will be required to validate my
                        request by email, and I may be contacted in order to
                        complete the request.
                      </Checkbox>
                    </Form.Item>
                  </div>

                  {status === "error" && (
                    <Alert
                      type="error"
                      showIcon
                      message="Something went wrong"
                      description="We couldn't submit your request. Please try again in a moment."
                      className="dsar-alert"
                    />
                  )}

                  <Form.Item className="dsar-submit-row">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={status === "submitting"}
                      className="dsar-submit-button"
                    >
                      Submit request
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Card>
          </div>
        </section>
      </Content>

      <SiteFooter />
    </Layout>
  );
}
